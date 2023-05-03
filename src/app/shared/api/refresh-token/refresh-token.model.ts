import { BaseResponse, Token } from '../shared/shared.model';

export type RefreshTokenRequest = {
  refreshToken: string;
  userId: string;
};

export type RefreshTokenResponse = BaseResponse<Token>;
