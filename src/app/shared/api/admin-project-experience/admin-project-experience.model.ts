import { BaseResponse, SelectList } from '../shared/shared.model';
import { UploadFiles } from '../upload/upload.model';

export type GetProjectExperienceResponse = BaseResponse<ProjectExperienceResponse>;

export type ProjectExperienceResponse = {
  total: number;
  projectExperiences: ProjectExperiences;
};

export type GetProjectExperienceByIdResponse = BaseResponse<ProjectExperience>;

export type ProjectExperience = {
  projectExperienceId: number;
  name: string;
  description: string;
  contributions: string;
  projectRoles: SelectList<string>;
  technologyTools: SelectList<string>;
  createDate: string;
};

export type ProjectExperiences = ProjectExperience[];

export type CreateProjectExperienceRequest = {
  name: string;
  description: string;
  contributions: string;
  descriptionFiles: UploadFiles;
  contributionsFiles: UploadFiles;
  projectRoles: SelectList<string>;
  technologyTools: SelectList<string>;
  userId: number;
};

export type UpdateProjectExperienceRequest = {
  projectExperienceId: number;
  name: string;
  description: string;
  contributions: string;
  descriptionFiles: UploadFiles;
  contributionsFiles: UploadFiles;
  projectRoles: SelectList<string>;
  technologyTools: SelectList<string>;
  userId: number;
};
