from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import SkillExchangeRequest, User
from schemas import SkillRequestCreate, SkillRequestResponse
from auth.dependencies import get_current_user

router = APIRouter()

@router.post("/requests/", response_model=SkillRequestResponse)
def send_request(request: SkillRequestCreate, db: Session = Depends(get_db)):
    new_request = SkillExchangeRequest(**request.dict())
    db.add(new_request)
    db.commit()
    db.refresh(new_request)
    return new_request

@router.get("/requests/received", response_model=List[SkillRequestResponse])
def get_received_requests(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(SkillExchangeRequest).filter(SkillExchangeRequest.to_user_id == current_user.id).all()

@router.post("/requests/{request_id}/respond")
def respond_to_request(
    request_id: int,
    response: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    req = db.query(SkillExchangeRequest).filter(SkillExchangeRequest.id == request_id).first()
    if not req or req.to_user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not allowed")

    if response not in ["accepted", "rejected"]:
        raise HTTPException(status_code=400, detail="Invalid response")

    if req.status != "pending":
        raise HTTPException(status_code=400, detail="Request is already handled.")

    if response == "accepted":
        # Accept this request
        req.status = "accepted"

        # Fetch both users
        sender = db.query(User).filter(User.id == req.from_user_id).first()
        receiver = db.query(User).filter(User.id == req.to_user_id).first()

        # Parse skill fields
        sender_giving = sender.giving_skills.split(',') if sender.giving_skills else []
        sender_wanted = sender.wanted_skills.split(',') if sender.wanted_skills else []
        receiver_giving = receiver.giving_skills.split(',') if receiver.giving_skills else []
        receiver_wanted = receiver.wanted_skills.split(',') if receiver.wanted_skills else []

        # Validate sender has the offered skill
        if req.skill_offered not in sender_giving:
            raise HTTPException(status_code=400, detail="Sender no longer has the offered skill.")

        # Validate receiver has the requested skill
        if req.skill_requested not in receiver_giving:
            raise HTTPException(status_code=400, detail="Receiver no longer has the requested skill.")

        # Perform the swap
        sender_giving.remove(req.skill_offered)
        if req.skill_requested not in sender_wanted:
            sender_wanted.append(req.skill_requested)

        receiver_giving.remove(req.skill_requested)
        if req.skill_offered not in receiver_wanted:
            receiver_wanted.append(req.skill_offered)

        # Save updated skills
        sender.giving_skills = ",".join(sender_giving)
        sender.wanted_skills = ",".join(sender_wanted)
        receiver.giving_skills = ",".join(receiver_giving)
        receiver.wanted_skills = ",".join(receiver_wanted)

        # Delete all other pending requests from sender offering same skill
        db.query(SkillExchangeRequest).filter(
            SkillExchangeRequest.from_user_id == sender.id,
            SkillExchangeRequest.skill_offered == req.skill_offered,
            SkillExchangeRequest.status == "pending",
            SkillExchangeRequest.id != req.id
        ).delete(synchronize_session=False)

    elif response == "rejected":
        req.status = "rejected"

    db.commit()
    return {"status": "success", "message": f"Request {response}."}
