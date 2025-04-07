from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import crud
import models
import schemas
from database import SessionLocal, engine, get_db
import traceback

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/roadmaps/", response_model=schemas.Roadmap)
def create_roadmap(roadmap: schemas.RoadmapCreate, db: Session = Depends(get_db)):
    try:
        print(f"Received roadmap creation request: {roadmap.dict()}")
        result = crud.create_roadmap(db=db, roadmap=roadmap)
        print(f"Successfully created roadmap with ID: {result.id}")
        return result
    except Exception as e:
        print(f"Error in create_roadmap endpoint: {str(e)}")
        print(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(
            status_code=500,
            detail="Failed to create roadmap. Please check if your OpenAI API key is set correctly."
        )

@app.get("/roadmaps/", response_model=list[schemas.Roadmap])
def read_roadmaps(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        roadmaps = crud.get_roadmaps(db, skip=skip, limit=limit)
        return roadmaps
    except Exception as e:
        print(f"Error in read_roadmaps: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch roadmaps")

@app.get("/roadmaps/{roadmap_id}", response_model=schemas.Roadmap)
def read_roadmap(roadmap_id: int, db: Session = Depends(get_db)):
    try:
        db_roadmap = crud.get_roadmap(db, roadmap_id=roadmap_id)
        if db_roadmap is None:
            raise HTTPException(status_code=404, detail="Roadmap not found")
        return db_roadmap
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in read_roadmap: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch roadmap")

@app.delete("/roadmaps/{roadmap_id}")
def delete_roadmap(roadmap_id: int, db: Session = Depends(get_db)):
    try:
        db_roadmap = crud.delete_roadmap(db, roadmap_id=roadmap_id)
        if db_roadmap is None:
            raise HTTPException(status_code=404, detail="Roadmap not found")
        return {"message": "Roadmap deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in delete_roadmap: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete roadmap")

# Module routes
@app.get("/modules/{module_id}", response_model=schemas.Module)
def read_module(module_id: int, db: Session = Depends(get_db)):
    db_module = crud.get_module(db, module_id=module_id)
    if db_module is None:
        raise HTTPException(status_code=404, detail="Module not found")
    return db_module

@app.get("/modules/roadmap/{roadmap_id}", response_model=list[schemas.Module])
def read_modules_by_roadmap(roadmap_id: int, db: Session = Depends(get_db)):
    modules = crud.get_modules_by_roadmap(db, roadmap_id=roadmap_id)
    return modules

# Resource routes
@app.get("/resources/{resource_id}", response_model=schemas.Resource)
def read_resource(resource_id: int, db: Session = Depends(get_db)):
    db_resource = crud.get_resource(db, resource_id=resource_id)
    if db_resource is None:
        raise HTTPException(status_code=404, detail="Resource not found")
    return db_resource

@app.get("/modules/{module_id}/resources", response_model=list[schemas.Resource])
def read_module_resources(module_id: int, db: Session = Depends(get_db)):
    resources = crud.get_resources_by_module(db, module_id=module_id)
    return resources 