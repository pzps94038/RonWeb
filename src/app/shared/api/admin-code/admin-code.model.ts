import { BaseResponse } from '../shared/shared.model';

export type GetAdminCodeResponse = BaseResponse<AdminCodeResponse>;

export type AdminCodeResponse = {
  total: number;
  codes: Codes;
};

export type GetAdminCodeByIdResponse = BaseResponse<Code>;

export type Code = {
  id: number;
  codeTypeId: string;
  codeId: string;
  codeName: string;
  createDate: string;
  createBy: number;
  updateDate?: string;
  updateBy?: number;
};

export type Codes = Code[];

export type CreateAdminCodeRequest = {
  codeTypeId: string;
  codeId: string;
  codeName: string;
  userId: number;
};

export type UpdateAdminCodeRequest = {
  codeTypeId: string;
  codeId: string;
  codeName: string;
  userId: number;
};
