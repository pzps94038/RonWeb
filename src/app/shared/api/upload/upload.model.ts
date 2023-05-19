import { BaseResponse } from '../shared/shared.model';
export type UploadFile = {
  fileName: string;
  path: string;
  url: string;
};

export type UploadFiles = UploadFile[];

export type UploadResponse = BaseResponse<UploadFile>;
