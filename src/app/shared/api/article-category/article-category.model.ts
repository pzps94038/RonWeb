import { BaseResponse } from '../shared/shared.model';

export type GetArticleCategoryResponse = BaseResponse<ArticleCategoryResponse>;

export type ArticleCategoryResponse = {
  total: number;
  categorys: ArticleCategorys;
};

export type ArticleCategory = {
  categoryId: number;
  categoryName: string;
  createDate: string;
};

export type ArticleCategorys = ArticleCategory[];

export type Category = Omit<ArticleCategory, 'createDate'>;

export type Categorys = Category[];
