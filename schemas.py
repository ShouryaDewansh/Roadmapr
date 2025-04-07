from pydantic import BaseModel
from typing import List

class ResourceBase(BaseModel):
    title: str
    description: str
    url: str
    resource_type: str

class ResourceCreate(ResourceBase):
    pass

class Resource(ResourceBase):
    id: int
    module_id: int

    class Config:
        from_attributes = True

class ModuleBase(BaseModel):
    title: str
    description: str
    order: int
    estimated_time: str

class ModuleCreate(ModuleBase):
    pass

class Module(ModuleBase):
    id: int
    roadmap_id: int
    resources: List[Resource] = []

    class Config:
        from_attributes = True

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