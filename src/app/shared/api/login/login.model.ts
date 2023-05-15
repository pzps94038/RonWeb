import { BaseResponse, Token } from '../shared/shared.model';

export type LoginRequest = {
  account: string;
  password: string;
};
export type UserInfo = {
  token: Token;
  userId: string;
};

export type LoginResponse = BaseResponse<UserInfo>;
