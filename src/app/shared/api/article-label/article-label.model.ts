import { BaseResponse } from '../shared/shared.model';

export type GetArticleLabelResponse = BaseResponse<Labels>;

export type GetArticleLabelByIdResponse = BaseResponse<Label>;

export type Label = {
  labelId: string;
  labelName: string;
};

export type Labels = Label[];

export type CreateArticleLabelRequest = {
  labelName: string;
};

export type ModifyArticleLabelRequest = Label;
