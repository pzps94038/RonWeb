import { BaseResponse, Token } from '../shared/shared.model';

export type LoginRequest = {
  account: string;
  password: string;
};

export type LoginResponse = BaseResponse<
  Token & {
    userId: string;
  }
>;
