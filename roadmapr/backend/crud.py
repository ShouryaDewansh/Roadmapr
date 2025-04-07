from sqlalchemy.orm import Session
import models
import schemas
import json
from ai_generator import generate_roadmap

def create_roadmap(db: Session, roadmap: schemas.RoadmapCreate):
    try:
        # Generate roadmap content using AI
        ai_content = generate_roadmap(roadmap.title, roadmap.skill_level, roadmap.description)
        
        # Create roadmap
        db_roadmap = models.Roadmap(
            title=roadmap.title,
            description=roadmap.description,
            skill_level=roadmap.skill_level
        )
        db.add(db_roadmap)
        db.flush()  # Get the ID without committing

        # Create modules from AI content
        for module_data in ai_content.get("modules", []):
            db_module = models.Module(
                title=module_data["title"],
                description=module_data["description"],
                roadmap_id=db_roadmap.id
            )
            db.add(db_module)
            db.flush()  # Get the ID without committing

            # Create resources for this module
            for resource_data in module_data.get("resources", []):
                db_resource = models.Resource(
                    title=resource_data["title"],
                    description=resource_data["description"],
                    url=resource_data.get("url", "https://example.com"),
                    resource_type=resource_data.get("resource_type", "documentation"),
                    module_id=db_module.id
                )
                db.add(db_resource)

        # Commit all changes at once
        db.commit()
        db.refresh(db_roadmap)
        return db_roadmap
    except Exception as e:
        db.rollback()
        print(f"Error in create_roadmap: {str(e)}")
        raise

def get_roadmap(db: Session, roadmap_id: int):
    return db.query(models.Roadmap).filter(models.Roadmap.id == roadmap_id).first()

def get_roadmaps(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Roadmap).offset(skip).limit(limit).all()

def delete_roadmap(db: Session, roadmap_id: int):
    db_roadmap = db.query(models.Roadmap).filter(models.Roadmap.id == roadmap_id).first()
    if db_roadmap:
        db.delete(db_roadmap)
        db.commit()
    return db_roadmap

def get_module(db: Session, module_id: int):
    return db.query(models.Module).filter(models.Module.id == module_id).first()

def get_modules_by_roadmap(db: Session, roadmap_id: int):
    return db.query(models.Module).filter(models.Module.roadmap_id == roadmap_id).all()

def get_resource(db: Session, resource_id: int):
    return db.query(models.Resource).filter(models.Resource.id == resource_id).first()

def get_resources_by_module(db: Session, module_id: int):
    return db.query(models.Resource).filter(models.Resource.module_id == module_id).all()