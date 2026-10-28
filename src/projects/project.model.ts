export type ProjectStatus = 'draft' | 'active' | 'archived' | 'closed';

export interface Project {
  id?: number;
  name: string;
  team_id: string;
  status: ProjectStatus;
  created_at?: string;
  updated_at?: string;
}
