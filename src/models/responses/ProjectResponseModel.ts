export interface AddProjectResponse {
  project_name: string;
  description: string;
  image: string;
  start_date: string;
  end_date: string;
  link: string;
  account_id: number;
}

export interface getProjectResponse {
  id: number;
  project_name: string;
  description: string;
  image: string;
  start_date: string;
  end_date: string;
  link: string;
  account_id: number;
}
