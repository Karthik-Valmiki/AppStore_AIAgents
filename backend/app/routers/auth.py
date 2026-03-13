from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_password_hash, verify_password, create_access_token
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin, Token, UserResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(user: UserCreate, db: Session = Depends(get_db)):
    try:
        print(f"Registration attempt: {user.username}, {user.email}, {user.role}")
        
        db_user = db.query(User).filter(User.username == user.username.lower()).first()
        if db_user:
            print(f"Username {user.username} already exists")
            raise HTTPException(status_code=400, detail="Username already registered")
        
        db_email = db.query(User).filter(User.email == user.email).first()
        if db_email:
            print(f"Email {user.email} already exists")
            raise HTTPException(status_code=400, detail="Email already registered")
        
        hashed_password = get_password_hash(user.password)
        print(f"Password hashed successfully")
        
        new_user = User(
            username=user.username.lower(),
            email=user.email.lower(),
            hashed_password=hashed_password,
            role=user.role
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        print(f"✅ User {new_user.username} registered successfully with ID {new_user.id}")
        return new_user
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        print(f"❌ Registration failed: {e}")
        raise HTTPException(status_code=500, detail="Registration failed. Please try again.")

@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    try:
        print(f"Login attempt: {user.username}")
        
        db_user = db.query(User).filter(User.username == user.username.lower()).first()
        
        if not db_user:
            print(f"❌ User {user.username} not found")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password"
            )
        
        if not verify_password(user.password, db_user.hashed_password):
            print(f"❌ Invalid password for user {user.username}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password"
            )
        
        access_token = create_access_token(data={"sub": db_user.username, "user_id": db_user.id})
        print(f"✅ User {db_user.username} logged in successfully")
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": db_user
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Login error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Login failed. Please try again."
        )
