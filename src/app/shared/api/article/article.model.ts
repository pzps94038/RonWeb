import { ArticleLabels } from '../article-label/article-label.model';
import { BaseResponse } from '../shared/shared.model';

export type GetArticleResponse = BaseResponse<ArticleResponse>;

export type ArticleResponse = {
  total: number;
  articles: Articles;
};

export type GetArticleByIdResponse = BaseResponse<Article>;

export type BlogPagination = {
  slug: string;
  articleTitle: string;
};

export type Article = {
  slug: string;
  articleTitle: string;
  categoryId: number;
  categoryName: string;
  labels: ArticleLabels;
  content: string;
  references: string[];
  createDate: string;
  nextArticle?: BlogPagination;
  prevArticle?: BlogPagination;
};

export type Articles = Article[];
