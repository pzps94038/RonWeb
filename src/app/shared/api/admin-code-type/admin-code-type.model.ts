import { BaseResponse } from '../shared/shared.model';

export type GetAdminCodeTypeResponse = BaseResponse<AdminCodeTypeResponse>;

export type AdminCodeTypeResponse = {
  total: number;
  codeTypes: CodeTypes;
};

export type GetAdminCodeTypeByIdResponse = BaseResponse<CodeType>;

export type CodeType = {
  id: number;
  codeTypeId: string;
  codeTypeName: string;
  createDate: string;
  createBy: number;
  updateDate?: string;
  updateBy?: number;
};

export type CodeTypes = CodeType[];

export type CreateAdminCodeTypeRequest = {
  codeTypeId: string;
  codeTypeName: string;
  userId: number;
};

export type UpdateAdminCodeTypeRequest = {
  codeTypeId: string;
  codeTypeName: string;
  userId: number;
};
