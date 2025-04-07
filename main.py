from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from models import Base
from database import engine, get_db
import crud
import schemas

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Roadmapr API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to Roadmapr API"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}

# Roadmap routes
@app.post("/roadmaps/", response_model=schemas.Roadmap)
def create_roadmap(roadmap: schemas.RoadmapCreate, db: Session = Depends(get_db)):
    return crud.create_roadmap(db=db, roadmap=roadmap)

@app.get("/roadmaps/", response_model=list[schemas.Roadmap])
def read_roadmaps(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    roadmaps = crud.get_roadmaps(db, skip=skip, limit=limit)
    return roadmaps

@app.get("/roadmaps/{roadmap_id}", response_model=schemas.Roadmap)
def read_roadmap(roadmap_id: int, db: Session = Depends(get_db)):
    db_roadmap = crud.get_roadmap(db, roadmap_id=roadmap_id)
    if db_roadmap is None:
        raise HTTPException(status_code=404, detail="Roadmap not found")
    return db_roadmap

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

@app.get("/resources/module/{module_id}", response_model=list[schemas.Resource])
def read_resources_by_module(module_id: int, db: Session = Depends(get_db)):
    resources = crud.get_resources_by_module(db, module_id=module_id)
    return resources 