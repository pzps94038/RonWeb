import { BaseResponse } from '../shared/shared.model';

export type GetDashboardResponse = BaseResponse<DashboardData>;

export type DashboardData = {
  totalArticles: number;
  totalCategories: number;
  totalLabels: number;
  totalViewCount: number;
  topViewedArticles: TopViewedArticle[];
  monthlyArticleTrend: MonthlyArticleTrend[];
  categoryDistribution: CategoryDistribution[];
};

export type TopViewedArticle = {
  articleId: number;
  articleTitle: string;
  categoryName: string;
  viewCount: number;
  createDate: string;
};

export type MonthlyArticleTrend = {
  year: number;
  month: number;
  count: number;
};

export type CategoryDistribution = {
  categoryId: number;
  categoryName: string;
  articleCount: number;
};
