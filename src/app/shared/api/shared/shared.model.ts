export interface BaseMessageResponse {
  returnCode: string;
  returnMessage: string;
}
export interface BaseResponse<T> extends BaseMessageResponse {
  data: T;
}
