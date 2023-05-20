import { ArticleLabels } from '../article-label/article-label.model';
import { BaseResponse } from '../shared/shared.model';
import { UploadFiles } from '../upload/upload.model';

export type GetArticleResponse = BaseResponse<ArticleResponse>;

export type ArticleResponse = {
  total: number;
  articles: Articles;
};

export type GetArticleByIdResponse = BaseResponse<Article>;

export type Article = {
  articleId: number;
  articleTitle: string;
  categoryId: number;
  categoryName: string;
  previewContent: string;
  labels: ArticleLabels;
  content: string;
  viewCount: number;
  createDate: string;
};

export type Articles = Article[];

export type CreateArticleRequest = {
  articleTitle: string;
  previewContent: string;
  content: string;
  categoryId: number;
  userId: number;
  prevFiles: UploadFiles;
  contentFiles: UploadFiles;
  labels: ArticleLabels;
};

export type UpdateArticleRequest = {
  articleId: number;
  articleTitle: string;
  previewContent: string;
  content: string;
  categoryId: number;
  userId: number;
  prevFiles: UploadFiles;
  contentFiles: UploadFiles;
  labels: ArticleLabels;
};
