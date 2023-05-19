import { BaseResponse } from '../shared/shared.model';
import { UploadFiles } from '../upload/upload.model';

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
  content: string;
  viewCount: number;
  createDate: string;
};

export type Articles = Article[];

export type CreateArticleRequest = {
  articleTitle: string;
  previewContent: string;
  content: string;
  categoryId: string;
  userId: string;
  prevFiles: UploadFiles;
  contentFiles: UploadFiles;
};

export type UpdateArticleRequest = {
  articleId: string;
  articleTitle: string;
  previewContent: string;
  content: string;
  categoryId: string;
  userId: string;
  prevFiles: UploadFiles;
  contentFiles: UploadFiles;
};
