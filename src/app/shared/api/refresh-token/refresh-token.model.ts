import { BaseResponse, Token } from '../shared/shared.model';

export type RefreshTokenRequest = {
  refreshToken: string;
  userId: number;
};

export type RefreshTokenResponse = BaseResponse<Token>;
