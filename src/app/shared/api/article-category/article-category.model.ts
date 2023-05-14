import { BaseResponse } from '../shared/shared.model';

export type GetArticleCategoryResponse = BaseResponse<ArticleCategorys>;

export type ArticleCategory = {
  categoryId: string;
  categoryName: string;
};

export type ArticleCategorys = ArticleCategory[];

export type CreateArticleCategoryRequest = {
  categoryName: string;
};

export type UpdateArticleCategoryRequest = ArticleCategory;
