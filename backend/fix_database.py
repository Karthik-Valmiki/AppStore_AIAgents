# Database Schema Fix Script
# Run this if you have existing database with enum columns

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import create_engine, text
from app.core.database import DATABASE_URL
from dotenv import load_dotenv

load_dotenv()

def fix_database_schema():
    """Fix database schema by converting enum columns to string"""
    engine = create_engine(DATABASE_URL)
    
    print("=== Database Schema Fix ===")
    print(f"Database URL: {DATABASE_URL}")
    
    with engine.connect() as conn:
        try:
            # Check if agents table exists
            result = conn.execute(text("""
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_name = 'agents'
                );
            """))
            table_exists = result.scalar()
            
            if not table_exists:
                print("✅ Agents table doesn't exist yet. Will be created with correct schema.")
                return
            
            print("📋 Checking agents table schema...")
            
            # Check current column type
            result = conn.execute(text("""
                SELECT data_type, udt_name 
                FROM information_schema.columns 
                WHERE table_name = 'agents' AND column_name = 'category';
            """))
            row = result.fetchone()
            
            if row:
                data_type, udt_name = row
                print(f"Current category column type: {data_type} ({udt_name})")
                
                if 'enum' in udt_name.lower() or data_type == 'USER-DEFINED':
                    print("🔧 Converting category column from enum to varchar...")
                    
                    # Drop the enum type constraint
                    conn.execute(text("""
                        ALTER TABLE agents 
                        ALTER COLUMN category TYPE VARCHAR(50);
                    """))
                    conn.commit()
                    
                    print("✅ Category column converted to varchar")
                else:
                    print("✅ Category column is already varchar")
            
            # Check interaction_type column
            result = conn.execute(text("""
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_name = 'interactions'
                );
            """))
            interactions_exists = result.scalar()
            
            if interactions_exists:
                result = conn.execute(text("""
                    SELECT data_type, udt_name 
                    FROM information_schema.columns 
                    WHERE table_name = 'interactions' AND column_name = 'interaction_type';
                """))
                row = result.fetchone()
                
                if row:
                    data_type, udt_name = row
                    print(f"Current interaction_type column type: {data_type} ({udt_name})")
                    
                    if 'enum' in udt_name.lower() or data_type == 'USER-DEFINED':
                        print("🔧 Converting interaction_type column from enum to varchar...")
                        
                        conn.execute(text("""
                            ALTER TABLE interactions 
                            ALTER COLUMN interaction_type TYPE VARCHAR(50);
                        """))
                        conn.commit()
                        
                        print("✅ Interaction_type column converted to varchar")
                    else:
                        print("✅ Interaction_type column is already varchar")
            
            # Check role column in users table
            result = conn.execute(text("""
                SELECT data_type, udt_name 
                FROM information_schema.columns 
                WHERE table_name = 'users' AND column_name = 'role';
            """))
            row = result.fetchone()
            
            if row:
                data_type, udt_name = row
                print(f"Current role column type: {data_type} ({udt_name})")
                
                if 'enum' in udt_name.lower() or data_type == 'USER-DEFINED':
                    print("🔧 Converting role column from enum to varchar...")
                    
                    conn.execute(text("""
                        ALTER TABLE users 
                        ALTER COLUMN role TYPE VARCHAR(50);
                    """))
                    conn.commit()
                    
                    print("✅ Role column converted to varchar")
                    
                    # Update any uppercase role values to lowercase
                    print("🔧 Converting role values to lowercase...")
                    conn.execute(text("""
                        UPDATE users 
                        SET role = LOWER(role) 
                        WHERE role IN ('DEVELOPER', 'CONSUMER');
                    """))
                    conn.commit()
                    print("✅ Role values converted to lowercase")
                else:
                    print("✅ Role column is already varchar")
            
            print("\n✅ Database schema fix completed successfully!")
            print("\nYou can now run: python init_db.py")
            
        except Exception as e:
            print(f"\n❌ Error fixing database schema: {e}")
            print("\nIf you see enum-related errors, you may need to:")
            print("1. Drop the database: DROP DATABASE agent_store;")
            print("2. Create fresh: CREATE DATABASE agent_store;")
            print("3. Run: python init_db.py")
            conn.rollback()
            raise

if __name__ == "__main__":
    fix_database_schema()
