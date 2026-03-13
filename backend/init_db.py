import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy import inspect, text
from app.core.database import engine, SessionLocal, Base
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def check_database_connection():
    """Test database connection"""
    print("\n" + "="*50)
    print("STEP 1: Testing Database Connection")
    print("="*50)
    try:
        with engine.connect() as conn:
            result = conn.execute(text("SELECT version();"))
            version = result.fetchone()[0]
            print(f"✅ PostgreSQL Connected")
            print(f"   Version: {version[:50]}...")
            return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        print("\nPlease check:")
        print("  1. PostgreSQL is running")
        print("  2. Database 'agent_store' exists")
        print("  3. Password in .env is correct")
        return False

def create_tables():
    """Create all database tables"""
    print("\n" + "="*50)
    print("STEP 2: Creating Database Tables")
    print("="*50)
    try:
        # Import models
        from app.models.user import User
        from app.models.agent import Agent
        from app.models.interaction import Interaction, Rating
        
        Base.metadata.create_all(bind=engine)
        print("✅ All tables created successfully!")
        return True
    except Exception as e:
        print(f"❌ Failed to create tables: {e}")
        import traceback
        traceback.print_exc()
        return False

def verify_tables():
    """Verify all tables exist"""
    print("\n" + "="*50)
    print("STEP 3: Verifying Tables")
    print("="*50)
    
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    
    expected_tables = ['users', 'agents', 'interactions', 'ratings']
    
    all_exist = True
    for table in expected_tables:
        if table in tables:
            columns = inspector.get_columns(table)
            print(f"✅ Table '{table}' exists ({len(columns)} columns)")
        else:
            print(f"❌ Table '{table}' NOT FOUND")
            all_exist = False
    
    return all_exist

def test_crud_operations():
    """Test basic CRUD operations"""
    print("\n" + "="*50)
    print("STEP 4: Testing Database Operations")
    print("="*50)
    
    db = SessionLocal()
    try:
        from app.models.user import User
        from app.models.agent import Agent
        from app.models.interaction import Interaction, Rating
        
        user_count = db.query(User).count()
        agent_count = db.query(Agent).count()
        interaction_count = db.query(Interaction).count()
        rating_count = db.query(Rating).count()
        
        print(f"✅ Database is operational")
        print(f"   Users: {user_count}")
        print(f"   Agents: {agent_count}")
        print(f"   Interactions: {interaction_count}")
        print(f"   Ratings: {rating_count}")
        
        return True
    except Exception as e:
        print(f"❌ Database operations failed: {e}")
        return False
    finally:
        db.close()

def main():
    print("\n" + "="*60)
    print("AI AGENT MARKETPLACE - DATABASE INITIALIZATION")
    print("="*60)
    
    if not check_database_connection():
        return False
    
    if not create_tables():
        return False
    
    if not verify_tables():
        return False
    
    if not test_crud_operations():
        return False
    
    print("\n" + "="*60)
    print("✅ DATABASE INITIALIZATION COMPLETE!")
    print("="*60)
    print("\nYou can now start the FastAPI server:")
    print("  uvicorn app.main:app --reload")
    print("\nAPI will be available at:")
    print("  - http://localhost:8000")
    print("  - http://localhost:8000/docs")
    print("="*60 + "\n")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
