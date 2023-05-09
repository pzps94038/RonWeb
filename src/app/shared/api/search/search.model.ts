import { Articles } from '../article/article.model';
import { BaseResponse } from '../shared/shared.model';

export type Search = {
  total: number;
  articles: Articles;
  keyword: string;
};

export type SearchKeywordResponse = BaseResponse<Search>;

export type SearchCategoryResponse = BaseResponse<Search>;
