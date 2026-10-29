export interface ProjectType {
  id: number;
  uuid: string;
  name: string;
}

export interface ProjectPhoto {
  id: number;
  uuid: string;
  project_id?: number;
  position?: number;
  file_url: string;
}

export interface Project {
  id: number;
  uuid: string;
  type_project_id: number;
  institution: string;
  year: string;
  title: string;
  description: string;
  photos: ProjectPhoto[];
  type_project: ProjectType;
}