#!/usr/bin/env python3
"""
Quick test script to verify the backend is working correctly
"""
import requests
import json
import sys

BASE_URL = "http://localhost:8000"

def test_health_check():
    """Test if the backend is running"""
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=5)
        if response.status_code == 200:
            print("✅ Backend health check passed")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Cannot connect to backend: {e}")
        return False

def test_registration():
    """Test user registration"""
    try:
        user_data = {
            "email": "test@example.com",
            "password": "testpassword123",
            "full_name": "Test User"
        }
        
        response = requests.post(f"{BASE_URL}/auth/register", 
                               json=user_data, timeout=5)
        
        if response.status_code in [200, 201]:
            print("✅ User registration successful")
            return True
        elif response.status_code == 400:
            result = response.json()
            if "already registered" in result.get("detail", ""):
                print("✅ User registration (user already exists)")
                return True
        
        print(f"❌ Registration failed: {response.status_code} - {response.text}")
        return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Registration request failed: {e}")
        return False

def test_login():
    """Test user login"""
    try:
        login_data = {
            "username": "test@example.com",  # OAuth2PasswordRequestForm uses 'username'
            "password": "testpassword123"
        }
        
        response = requests.post(f"{BASE_URL}/auth/login", 
                               data=login_data, timeout=5)
        
        if response.status_code == 200:
            result = response.json()
            if "access_token" in result:
                print("✅ User login successful")
                return result["access_token"]
        
        print(f"❌ Login failed: {response.status_code} - {response.text}")
        return None
    except requests.exceptions.RequestException as e:
        print(f"❌ Login request failed: {e}")
        return None

def test_protected_endpoint(token):
    """Test a protected endpoint"""
    try:
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.get(f"{BASE_URL}/auth/me", 
                              headers=headers, timeout=5)
        
        if response.status_code == 200:
            user_data = response.json()
            print(f"✅ Protected endpoint works - User: {user_data.get('email')}")
            return True
        
        print(f"❌ Protected endpoint failed: {response.status_code} - {response.text}")
        return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Protected endpoint request failed: {e}")
        return False

def test_reports_endpoint(token):
    """Test reports endpoint"""
    try:
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.get(f"{BASE_URL}/api/v1/reports", 
                              headers=headers, timeout=5)
        
        if response.status_code == 200:
            reports_data = response.json()
            print(f"✅ Reports endpoint works - Found {reports_data.get('total', 0)} reports")
            return True
        
        print(f"❌ Reports endpoint failed: {response.status_code} - {response.text}")
        return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Reports endpoint request failed: {e}")
        return False

def main():
    print("🔍 Testing ValuerPro Backend...")
    print("=" * 50)
    
    # Test health check
    if not test_health_check():
        print("\n❌ Backend is not running. Please start it with:")
        print("cd backend && uvicorn main:app --reload")
        return 1
    
    # Test registration
    test_registration()
    
    # Test login
    token = test_login()
    if not token:
        print("\n❌ Cannot proceed without valid token")
        return 1
    
    # Test protected endpoints
    test_protected_endpoint(token)
    test_reports_endpoint(token)
    
    print("\n" + "=" * 50)
    print("🎉 Backend testing completed!")
    print("\nYour FastAPI backend is ready for the frontend to connect to.")
    print(f"Backend running at: {BASE_URL}")
    print("Frontend should use: NEXT_PUBLIC_API_URL=http://localhost:8000")
    
    return 0

if __name__ == "__main__":
    sys.exit(main())