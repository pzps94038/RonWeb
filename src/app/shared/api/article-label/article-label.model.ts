import { BaseResponse } from '../shared/shared.model';

export type GetArticleLabelResponse = BaseResponse<ArticleLabels>;

export type GetArticleLabelByIdResponse = BaseResponse<ArticleLabel>;

export type ArticleLabel = {
  labelId: string;
  labelName: string;
};

export type ArticleLabels = ArticleLabel[];

export type CreateArticleLabelRequest = {
  labelName: string;
};

export type ModifyArticleLabelRequest = ArticleLabel;
