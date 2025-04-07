from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class Roadmap(Base):
    __tablename__ = "roadmaps"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    skill_level = Column(String)
    
    modules = relationship("Module", back_populates="roadmap", cascade="all, delete-orphan")

class Module(Base):
    __tablename__ = "modules"
    
    id = Column(Integer, primary_key=True, index=True)
    roadmap_id = Column(Integer, ForeignKey("roadmaps.id"))
    title = Column(String, index=True)
    description = Column(String)
    order = Column(Integer)
    estimated_time = Column(String)
    
    roadmap = relationship("Roadmap", back_populates="modules")
    resources = relationship("Resource", back_populates="module", cascade="all, delete-orphan")

class Resource(Base):
    __tablename__ = "resources"
    
    id = Column(Integer, primary_key=True, index=True)
    module_id = Column(Integer, ForeignKey("modules.id"))
    title = Column(String, index=True)
    description = Column(String)
    url = Column(String)
    resource_type = Column(String)
    
    module = relationship("Module", back_populates="resources") 