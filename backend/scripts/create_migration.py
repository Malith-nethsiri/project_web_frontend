#!/usr/bin/env python3
"""
Script to create initial database migration
Run this after setting up the database
"""

import subprocess
import sys
import os

def main():
    try:
        # Change to backend directory
        backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        os.chdir(backend_dir)
        
        print("Creating initial migration...")
        result = subprocess.run([
            sys.executable, "-m", "alembic", "revision", "--autogenerate", "-m", "Initial migration"
        ], capture_output=True, text=True)
        
        if result.returncode == 0:
            print("Migration created successfully!")
            print(result.stdout)
        else:
            print("Error creating migration:")
            print(result.stderr)
            return 1
            
        print("\nApplying migration...")
        result = subprocess.run([
            sys.executable, "-m", "alembic", "upgrade", "head"
        ], capture_output=True, text=True)
        
        if result.returncode == 0:
            print("Migration applied successfully!")
            print(result.stdout)
        else:
            print("Error applying migration:")
            print(result.stderr)
            return 1
            
    except Exception as e:
        print(f"Error: {e}")
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main())