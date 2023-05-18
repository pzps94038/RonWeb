import { BaseResponse } from '../shared/shared.model';

export type GetArticleCategoryResponse = BaseResponse<ArticleCategoryResponse>;

export type ArticleCategoryResponse = {
  total: number;
  categorys: ArticleCategorys;
};

export type ArticleCategory = {
  categoryId: string;
  categoryName: string;
  createDate: string;
};

export type GetArticleCategoryByIdResponse = BaseResponse<ArticleCategory>;

export type ArticleCategorys = ArticleCategory[];

export type Category = Omit<ArticleCategory, 'createDate'>;

export type Categorys = Category[];

export type CreateArticleCategoryRequest = {
  categoryName: string;
  userId: string;
};

export type UpdateArticleCategoryRequest = {
  categoryId: string;
  categoryName: string;
  userId: string;
};
