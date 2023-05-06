import { ArticleLabels } from '../article-label/article-label.model';
import { BaseResponse } from '../shared/shared.model';

export type GetArticleResponse = BaseResponse<Articles>;
export type GetArticleByIdResponse = BaseResponse<Article>;

export type Article = {
  articleId: string;
  articleTitle: string;
  description: string;
  categoryId: string;
  categoryName: string;
  viewCount: number;
  labels: ArticleLabels;
  createDate: string;
};

export type Articles = Article[];
