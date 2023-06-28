import { ArticleLabels } from '../article-label/article-label.model';
import { BaseResponse } from '../shared/shared.model';

export type GetArticleResponse = BaseResponse<ArticleResponse>;

export type ArticleResponse = {
  total: number;
  articles: Articles;
};

export type GetArticleByIdResponse = BaseResponse<Article>;

export type BlogPagination = {
  articleId: number;
  articleTitle: string;
};

export type Article = {
  articleId: number;
  articleTitle: string;
  categoryId: number;
  categoryName: string;
  previewContent: string;
  flag: string;
  labels: ArticleLabels;
  content: string;
  viewCount: number;
  createDate: string;
  nextArticle?: BlogPagination;
  prevArticle?: BlogPagination;
};

export type Articles = Article[];
