import os
import uuid
from typing import List

from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from fastapi.responses import JSONResponse

from app.api.auth.deps import get_current_active_user
from app.models.user import User
from app.core.config import get_settings

settings = get_settings()
router = APIRouter()

# Create upload directory if it doesn't exist
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)

def save_upload_file(upload_file: UploadFile) -> dict:
    # Generate unique filename
    file_extension = os.path.splitext(upload_file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(settings.UPLOAD_DIR, unique_filename)
    
    # Save file
    with open(file_path, "wb") as buffer:
        content = upload_file.file.read()
        buffer.write(content)
    
    return {
        "file_url": f"/uploads/{unique_filename}",
        "filename": upload_file.filename,
        "file_size": len(content),
        "file_type": upload_file.content_type
    }

@router.post("/single")
async def upload_single_file(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_active_user)
) -> dict:
    if file.size > settings.MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File too large")
    
    file_extension = os.path.splitext(file.filename)[1].lower()
    if file_extension not in settings.ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="File type not allowed")
    
    try:
        result = save_upload_file(file)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

@router.post("/multiple")
async def upload_multiple_files(
    files: List[UploadFile] = File(...),
    current_user: User = Depends(get_current_active_user)
) -> List[dict]:
    if len(files) > 10:  # Limit to 10 files
        raise HTTPException(status_code=400, detail="Too many files")
    
    results = []
    for file in files:
        if file.size > settings.MAX_FILE_SIZE:
            results.append({"error": f"File {file.filename} too large", "filename": file.filename})
            continue
            
        file_extension = os.path.splitext(file.filename)[1].lower()
        if file_extension not in settings.ALLOWED_EXTENSIONS:
            results.append({"error": f"File type not allowed", "filename": file.filename})
            continue
        
        try:
            result = save_upload_file(file)
            results.append(result)
        except Exception as e:
            results.append({"error": f"Upload failed: {str(e)}", "filename": file.filename})
    
    return results