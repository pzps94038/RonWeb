import { BaseResponse } from '../shared/shared.model';

export type GetCategoryResponse = BaseResponse<Categorys>;

export type Category = {
  categoryId: string;
  categoryName: string;
};

export type Categorys = Category[];

export type CreateCategoryRequest = {
  categoryName: string;
};

export type ModifyCategoryNameRequest = Category;
