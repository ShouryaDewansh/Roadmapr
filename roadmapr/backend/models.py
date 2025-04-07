from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Roadmap(Base):
    __tablename__ = "roadmaps"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    skill_level = Column(String)
    modules = relationship("Module", back_populates="roadmap", cascade="all, delete-orphan")

class Module(Base):
    __tablename__ = "modules"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    roadmap_id = Column(Integer, ForeignKey("roadmaps.id"))
    roadmap = relationship("Roadmap", back_populates="modules")
    resources = relationship("Resource", back_populates="module", cascade="all, delete-orphan")

class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    url = Column(String)
    resource_type = Column(String)
    module_id = Column(Integer, ForeignKey("modules.id"))
    module = relationship("Module", back_populates="resources")