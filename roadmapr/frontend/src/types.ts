export interface Resource {
  id: number;
  module_id: number;
  title: string;
  description: string;
  url: string;
  resource_type: string;
}

export interface Module {
  id: number;
  roadmap_id: number;
  title: string;
  description: string;
  order: number;
  estimated_time: string;
  resources: Resource[];
}

export interface Roadmap {
  id: number;
  title: string;
  description: string;
  skill_level: string;
  modules: Module[];
} 