from pydantic import BaseModel
from typing import List, Optional

# Resource schemas
class ResourceBase(BaseModel):
    title: str
    description: str
    url: str = "https://example.com"
    resource_type: str = "documentation"

class ResourceCreate(ResourceBase):
    pass

class Resource(ResourceBase):
    id: int
    module_id: int

    class Config:
        from_attributes = True

# Module schemas
class ModuleBase(BaseModel):
    title: str
    description: str

class ModuleCreate(ModuleBase):
    resources: List[ResourceCreate] = []

class Module(ModuleBase):
    id: int
    roadmap_id: int
    resources: List[Resource] = []

    class Config:
        from_attributes = True

# Roadmap schemas
class RoadmapBase(BaseModel):
    title: str
    description: str
    skill_level: str

class RoadmapCreate(RoadmapBase):
    pass

class Roadmap(RoadmapBase):
    id: int
    modules: List[Module] = []

    class Config:
        from_attributes = True