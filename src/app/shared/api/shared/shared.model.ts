export type BaseMessageResponse = {
  returnCode: ReturnCode;
  returnMessage: string;
};

export type BaseResponse<T> = BaseMessageResponse & {
  data: T;
};

export type Token = {
  accessToken: string;
  refreshToken: string;
};

export enum ReturnCode {
  Success = '00',
  AuthExpired = '96',
  Unique = '97',
  NotFound = '98',
  Fail = '99',
}
