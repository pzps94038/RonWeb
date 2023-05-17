import { BaseResponse } from '../shared/shared.model';

export type GetArticleCategoryResponse = BaseResponse<ArticleCategorys>;

export type ArticleCategory = {
  categoryId: string;
  categoryName: string;
  createDate: string;
};
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
