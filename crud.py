from sqlalchemy.orm import Session
import models
import schemas
from ai_generator import generate_roadmap

def create_roadmap(db: Session, roadmap: schemas.RoadmapCreate):
    # Create the roadmap
    db_roadmap = models.Roadmap(**roadmap.dict())
    db.add(db_roadmap)
    db.commit()
    db.refresh(db_roadmap)

    # Generate modules and resources using AI
    generated_modules = generate_roadmap(roadmap.title, roadmap.description, roadmap.skill_level)

    # Create modules and resources
    for module_data in generated_modules:
        resources_data = module_data.pop("resources", [])
        
        # Create module
        db_module = models.Module(**module_data, roadmap_id=db_roadmap.id)
        db.add(db_module)
        db.commit()
        db.refresh(db_module)

        # Create resources
        for resource_data in resources_data:
            db_resource = models.Resource(**resource_data, module_id=db_module.id)
            db.add(db_resource)
            db.commit()
            db.refresh(db_resource)

    # Refresh roadmap to get all relationships
    db.refresh(db_roadmap)
    return db_roadmap

def get_roadmap(db: Session, roadmap_id: int):
    return db.query(models.Roadmap).filter(models.Roadmap.id == roadmap_id).first()

def get_roadmaps(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Roadmap).offset(skip).limit(limit).all()

def get_module(db: Session, module_id: int):
    return db.query(models.Module).filter(models.Module.id == module_id).first()

def get_modules_by_roadmap(db: Session, roadmap_id: int):
    return db.query(models.Module).filter(models.Module.roadmap_id == roadmap_id).all()

def get_resource(db: Session, resource_id: int):
    return db.query(models.Resource).filter(models.Resource.id == resource_id).first()

def get_resources_by_module(db: Session, module_id: int):
    return db.query(models.Resource).filter(models.Resource.module_id == module_id).all() 