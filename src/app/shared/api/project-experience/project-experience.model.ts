import { BaseResponse, SelectList } from '../shared/shared.model';

export type GetProjectExperienceListResponse = BaseResponse<ProjectExperienceListData>;

export type ProjectExperienceListData = {
  total: number;
  projectExperiences: ProjectExperienceItem[];
};

export type ProjectExperienceItem = {
  projectExperienceId: number;
  name: string;
  description: string;
  contributions: string;
  projectRoles: SelectList<string>;
  technologyTools: SelectList<string>;
  createDate: string;
};
