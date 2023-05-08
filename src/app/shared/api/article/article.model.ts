import { BaseResponse } from '../shared/shared.model';

export type GetArticleResponse = BaseResponse<ArticleResponse>;

export type ArticleResponse = {
  total: number;
  articles: Articles;
};

export type GetArticleByIdResponse = BaseResponse<Article>;

export type Article = {
  articleId: string;
  articleTitle: string;
  categoryId: string;
  categoryName: string;
  previewContent: string;
  viewCount: number;
  createDate: string;
};

export type Articles = Article[];
