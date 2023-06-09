import { BaseResponse } from '../shared/shared.model';

export type GetArticleLabelResponse = BaseResponse<ArticleLabelResponse>;

export type ArticleLabelResponse = {
  total: number;
  labels: ArticleLabels;
};

export type ArticleLabel = {
  labelId: number;
  labelName: string;
  createDate: string;
};

export type GetArticleLabelByIdResponse = BaseResponse<ArticleLabel>;

export type ArticleLabels = ArticleLabel[];

export type CreateArticleLabelRequest = {
  labelName: string;
  userId: number;
};

export type UpdateArticleLabelRequest = {
  labelId: number;
  labelName: string;
  userId: number;
};
