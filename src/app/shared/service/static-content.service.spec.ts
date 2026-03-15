import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StaticContentService, PostIndexItem } from './static-content.service';
import { POSTS_INDEX, CATEGORIES, LABELS } from '../data/posts-index';

describe('StaticContentService - 靜態內容服務', () => {
  let service: StaticContentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(StaticContentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('應建立服務', () => {
    expect(service).toBeTruthy();
  });

  describe('getArticles - 分頁文章列表', () => {
    it('取得第1頁文章（預設每頁10筆）', done => {
      service.getArticles(1).subscribe(result => {
        expect(result.total).toBe(POSTS_INDEX.length);
        expect(result.items.length).toBeLessThanOrEqual(10);
        if (POSTS_INDEX.length > 0) {
          expect(result.items[0]).toEqual(POSTS_INDEX[0]);
        }
        done();
      });
    });

    it('取得第2頁文章', done => {
      service.getArticles(2).subscribe(result => {
        expect(result.total).toBe(POSTS_INDEX.length);
        if (POSTS_INDEX.length > 10) {
          expect(result.items[0]).toEqual(POSTS_INDEX[10]);
        }
        done();
      });
    });

    it('超出範圍的頁碼回傳空陣列', done => {
      const outOfRange = Math.ceil(POSTS_INDEX.length / 10) + 10;
      service.getArticles(outOfRange).subscribe(result => {
        expect(result.total).toBe(POSTS_INDEX.length);
        expect(result.items.length).toBe(0);
        done();
      });
    });

    it('不帶頁碼時預設為第1頁', done => {
      service.getArticles().subscribe(result => {
        expect(result.total).toBe(POSTS_INDEX.length);
        expect(result.items.length).toBeLessThanOrEqual(10);
        done();
      });
    });
  });

  describe('getArticleBySlug - 取得單篇文章', () => {
    it('成功取得並解析 .md 文章', done => {
      const fakeMd = `---
{
  "title": "測試文章",
  "categoryId": 1,
  "categoryName": "前端",
  "labels": [{"labelId": 1, "labelName": "Angular"}],
  "viewCount": 100,
  "createDate": "2024-01-01T00:00:00.000Z",
  "references": [],
  "previewContent": "預覽",
  "flag": "Y"
}
---

# 標題

段落內容`;

      service.getArticleBySlug('2024-01-01-test-article').subscribe(result => {
        expect(result.articleTitle).toBe('測試文章');
        expect(result.categoryName).toBe('前端');
        expect(result.content).toContain('<h1');
        expect(result.content).toContain('標題');
        done();
      });
      const req = httpMock.expectOne('assets/posts/2024-01-01-test-article.md');
      req.flush(fakeMd);
    });

    it('快取機制：相同 slug 不重複發請求', done => {
      const fakeMd = `---
{
  "title": "快取測試",
  "categoryId": 1,
  "categoryName": "前端",
  "labels": [],
  "viewCount": 0,
  "createDate": "2024-01-01",
  "references": [],
  "previewContent": "",
  "flag": "Y"
}
---

內容`;

      service.getArticleBySlug('2024-01-01-cache-test').subscribe(() => {
        service.getArticleBySlug('2024-01-01-cache-test').subscribe(result => {
          expect(result.articleTitle).toBe('快取測試');
          done();
        });
      });
      const req = httpMock.expectOne('assets/posts/2024-01-01-cache-test.md');
      req.flush(fakeMd);
    });

    it('不存在的文章回傳 404 錯誤', done => {
      service.getArticleBySlug('non-existent-slug').subscribe({
        error: err => {
          expect(err.status).toBe(404);
          done();
        },
      });
      const req = httpMock.expectOne('assets/posts/non-existent-slug.md');
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('getCategories - 取得分類列表', () => {
    it('成功取得分類', done => {
      service.getCategories().subscribe(result => {
        expect(result).toEqual(CATEGORIES);
        expect(result.length).toBe(CATEGORIES.length);
        done();
      });
    });
  });

  describe('getLabels - 取得標籤列表', () => {
    it('成功取得標籤', done => {
      service.getLabels().subscribe(result => {
        expect(result).toEqual(LABELS);
        expect(result.length).toBe(LABELS.length);
        done();
      });
    });
  });

  describe('getArticlesByCategory - 依分類篩選', () => {
    it('篩選出指定分類的文章', done => {
      if (POSTS_INDEX.length === 0) {
        done();
        return;
      }
      const targetCategoryId = POSTS_INDEX[0].categoryId;
      service.getArticlesByCategory(targetCategoryId).subscribe(result => {
        expect(result.items.every(a => a.categoryId === targetCategoryId)).toBeTrue();
        expect(result.keyword).toBe(POSTS_INDEX[0].categoryName);
        done();
      });
    });

    it('不存在的分類回傳空結果', done => {
      service.getArticlesByCategory(99999).subscribe(result => {
        expect(result.total).toBe(0);
        expect(result.items.length).toBe(0);
        expect(result.keyword).toBe('');
        done();
      });
    });
  });

  describe('getArticlesByLabel - 依標籤篩選', () => {
    it('篩選出指定標籤的文章', done => {
      if (POSTS_INDEX.length === 0 || POSTS_INDEX[0].labels.length === 0) {
        done();
        return;
      }
      const targetLabelId = POSTS_INDEX[0].labels[0].labelId;
      service.getArticlesByLabel(targetLabelId).subscribe(result => {
        expect(result.items.every(a => a.labels.some(l => l.labelId === targetLabelId))).toBeTrue();
        done();
      });
    });

    it('不存在的標籤回傳空結果', done => {
      service.getArticlesByLabel(99999).subscribe(result => {
        expect(result.total).toBe(0);
        expect(result.items.length).toBe(0);
        expect(result.keyword).toBe('');
        done();
      });
    });
  });

  describe('searchArticles - 關鍵字搜尋', () => {
    it('依標題搜尋', done => {
      if (POSTS_INDEX.length === 0) {
        done();
        return;
      }
      const keyword = POSTS_INDEX[0].articleTitle.substring(0, 3);
      service.searchArticles(keyword).subscribe(result => {
        expect(result.total).toBeGreaterThanOrEqual(1);
        done();
      });
    });

    it('搜尋不區分大小寫', done => {
      service.searchArticles('ANGULAR').subscribe(result => {
        const lowerResult$ = service.searchArticles('angular');
        lowerResult$.subscribe(lowerResult => {
          expect(result.total).toBe(lowerResult.total);
          done();
        });
      });
    });

    it('無匹配結果回傳空陣列', done => {
      service.searchArticles('完全不存在的關鍵字XYZ99999').subscribe(result => {
        expect(result.total).toBe(0);
        expect(result.items.length).toBe(0);
        done();
      });
    });
  });

  describe('parseFrontmatter - 解析 frontmatter', () => {
    it('無效的 frontmatter 回傳原始內容', done => {
      const rawContent = '沒有 frontmatter 的純文字';
      service.getArticleBySlug('no-frontmatter').subscribe(result => {
        // 無 frontmatter 時 data 為空物件
        expect(result.content).toContain('沒有 frontmatter 的純文字');
        done();
      });
      const req = httpMock.expectOne('assets/posts/no-frontmatter.md');
      req.flush(rawContent);
    });

    it('無效 JSON frontmatter 回傳原始內容', done => {
      const rawContent = `---
invalid json {{{
---

內容`;
      service.getArticleBySlug('invalid-frontmatter').subscribe(result => {
        expect(result.content).toContain('內容');
        done();
      });
      const req = httpMock.expectOne('assets/posts/invalid-frontmatter.md');
      req.flush(rawContent);
    });
  });
});
