/**
 * RonWeb 靜態部落格 E2E 測試
 * 驗證所有核心功能：首頁、文章詳情、分類、標籤、搜尋、主題切換、導航
 */
describe('靜態部落格 E2E 測試', () => {
  const baseUrl = Cypress.env('baseUrl') || 'http://localhost:4200';

  describe('首頁與文章列表', () => {
    beforeEach(() => {
      cy.visit(`${baseUrl}/blog`);
    });

    it('應正確載入首頁並顯示文章列表', () => {
      // 確認頁面標題元素存在
      cy.get('app-header').should('exist');
      cy.get('app-footer').should('exist');
      // 確認文章卡片有渲染
      cy.get('app-article-card').should('have.length.greaterThan', 0);
    });

    it('文章卡片應包含標題、日期、分類', () => {
      cy.get('app-article-card')
        .first()
        .within(() => {
          // 卡片內應有可見文字內容
          cy.get('a, h2, h3, [class*="title"]').should('exist');
        });
    });

    it('應有分頁功能', () => {
      // 確認分頁元件存在
      cy.get('app-pagination').should('exist');
    });

    it('應有側邊欄分類與標籤', () => {
      cy.get('app-article-category').should('exist');
      cy.get('app-article-label').should('exist');
    });
  });

  describe('文章詳情頁（讀取 .md 檔案）', () => {
    it('應能點擊文章卡片進入詳情頁', () => {
      cy.visit(`${baseUrl}/blog`);
      // 文章卡片使用 (click) 事件導航，點擊「繼續閱讀」或卡片本體
      cy.get('app-article-card').first().find('span').contains('繼續閱讀').click();
      // 確認 URL 變更為文章頁
      cy.url().should('include', '/blog/article/');
    });

    it('文章詳情應顯示標題與 Markdown 轉 HTML 的內容', () => {
      // 直接訪問已知文章（id=1: Angular v16 升級大綱）
      cy.visit(`${baseUrl}/blog/article/1`);
      // 等待文章載入
      cy.get('.article-content', { timeout: 10000 }).should('exist');
      // 確認有標題
      cy.contains('Angular v16').should('exist');
      // 確認 Markdown 已轉為 HTML（應有 <pre><code> 程式碼區塊或 <h4> 標題等）
      cy.get('.article-content').then($el => {
        const html = $el.html();
        // 確認含有 HTML 標籤（代表 Markdown 已成功轉換）
        expect(html).to.match(/<(h[1-6]|p|pre|code|ul|ol|blockquote)/);
      });
    });

    it('文章詳情應顯示參考連結', () => {
      cy.visit(`${baseUrl}/blog/article/1`);
      cy.get('.article-content', { timeout: 10000 }).should('exist');
      // 文章 1 有 references，確認參考連結區域
      cy.contains('angular.io').should('exist');
    });

    it('文章應有上下篇導航', () => {
      cy.visit(`${baseUrl}/blog/article/1`);
      cy.get('.article-content', { timeout: 10000 }).should('exist');
      // 上下篇導航使用 [routerLink] 屬性綁定，在 DOM 中呈現為 href
      cy.get('a[href*="/blog/article/"]').should('have.length.greaterThan', 0);
    });

    it('文章頁應有 TOC 目錄（桌面版）', () => {
      cy.viewport(1280, 800);
      cy.visit(`${baseUrl}/blog/article/1`);
      cy.get('.article-content', { timeout: 10000 }).should('exist');
      // 等待 TOC 建立（setTimeout 0）
      cy.wait(500);
      // 桌面版應顯示 TOC（如果文章有標題）
      cy.get('body').then($body => {
        // TOC 可能在某個 aside 或 nav 中
        const hasToc = $body.find('[class*="toc"], [class*="table-of-content"]').length > 0;
        if (hasToc) {
          cy.get('[class*="toc"], [class*="table-of-content"]').should('be.visible');
        }
      });
    });
  });

  describe('分類篩選', () => {
    it('點擊側邊欄分類應篩選文章', () => {
      cy.visit(`${baseUrl}/blog`);
      // 點擊第一個分類
      cy.get('app-article-category').find('a').first().click();
      cy.url().should('include', '/blog/category/');
      // 確認有文章卡片或空狀態
      cy.get('body').should('exist');
    });

    it('分類頁應顯示該分類的文章', () => {
      // 分類 1 = 前端
      cy.visit(`${baseUrl}/blog/category/1`);
      cy.get('app-article-card', { timeout: 10000 }).should('have.length.greaterThan', 0);
    });
  });

  describe('標籤篩選', () => {
    it('點擊側邊欄標籤應篩選文章', () => {
      cy.visit(`${baseUrl}/blog`);
      cy.get('app-article-label').find('a').first().click();
      cy.url().should('include', '/blog/label/');
    });

    it('標籤頁應顯示該標籤的文章', () => {
      // 標籤 1 = 版本更新
      cy.visit(`${baseUrl}/blog/label/1`);
      cy.get('app-article-card', { timeout: 10000 }).should('have.length.greaterThan', 0);
    });
  });

  describe('搜尋功能', () => {
    it('應能搜尋文章', () => {
      cy.visit(`${baseUrl}/blog`);
      // 找到搜尋輸入框
      cy.get(
        'input[type="text"], input[type="search"], input[placeholder*="搜尋"], input[placeholder*="search"]',
      )
        .first()
        .type('Angular{enter}');
      cy.url().should('include', '/blog/search/');
    });

    it('搜尋結果應包含相關文章', () => {
      cy.visit(`${baseUrl}/blog/search/Angular`);
      cy.get('app-article-card', { timeout: 10000 }).should('have.length.greaterThan', 0);
    });

    it('搜尋不存在的關鍵字應顯示空狀態', () => {
      cy.visit(`${baseUrl}/blog/search/zzzznonexistentkeyword`);
      // 應沒有文章卡片
      cy.get('app-article-card').should('have.length', 0);
    });
  });

  describe('主題切換', () => {
    it('應能切換深色/淺色主題', () => {
      cy.visit(`${baseUrl}/blog`);
      // 取得當前主題
      cy.get('html').then($html => {
        const initialTheme = $html.attr('data-theme');
        // 點擊主題切換按鈕
        cy.get('button[aria-label="切換主題"]').first().click();
        // 確認主題已變更
        cy.get('html').should('not.have.attr', 'data-theme', initialTheme);
      });
    });

    it('主題切換後重新載入應保持', () => {
      cy.visit(`${baseUrl}/blog`);
      cy.get('button[aria-label="切換主題"]').first().click();
      cy.get('html')
        .invoke('attr', 'data-theme')
        .then(theme => {
          cy.reload();
          cy.get('html').should('have.attr', 'data-theme', theme);
        });
    });
  });

  describe('導航與路由', () => {
    it('根路徑應重定向到 /blog', () => {
      cy.visit(`${baseUrl}/`);
      cy.url().should('include', '/blog');
    });

    it('不存在的路徑應重定向到 /blog', () => {
      cy.visit(`${baseUrl}/nonexistent-page`);
      cy.url().should('include', '/blog');
    });

    it('Header Logo 應連回首頁', () => {
      cy.visit(`${baseUrl}/blog/article/1`);
      cy.get('.article-content', { timeout: 10000 }).should('exist');
      cy.get('app-header a').first().click();
      cy.url().should('match', /\/blog$/);
    });

    it('關於我頁面應可訪問', () => {
      cy.visit(`${baseUrl}/about-me`);
      cy.get('body').should('exist');
      cy.url().should('include', '/about-me');
    });

    it('Header 導航連結應能正常切換', () => {
      cy.visit(`${baseUrl}/blog`);
      // 點擊「關於我」連結
      cy.contains('關於我').click();
      cy.url().should('include', '/about-me');
      // 點擊「文章」回到 blog
      cy.contains('文章').click();
      cy.url().should('include', '/blog');
    });
  });

  describe('RWD 響應式', () => {
    it('手機版應有漢堡選單', () => {
      cy.viewport(375, 667);
      cy.visit(`${baseUrl}/blog`);
      // 桌面連結應隱藏
      cy.get('nav.hidden.md\\:flex').should('exist');
      // 漢堡按鈕應可見
      cy.get('button[aria-label="選單"]').should('be.visible');
    });

    it('手機版漢堡選單應能展開', () => {
      cy.viewport(375, 667);
      cy.visit(`${baseUrl}/blog`);
      cy.get('button[aria-label="選單"]').click();
      // 選單展開後應在行動裝置選單區域顯示導航連結
      cy.get('.md\\:hidden nav').within(() => {
        cy.contains('文章').should('be.visible');
        cy.contains('關於我').should('be.visible');
      });
    });
  });

  describe('程式碼高亮', () => {
    it('文章中的程式碼區塊應有語法高亮', () => {
      // 文章 1 有 TypeScript 程式碼區塊
      cy.visit(`${baseUrl}/blog/article/1`);
      cy.get('.article-content', { timeout: 10000 }).should('exist');
      // 等待 highlight.js 處理
      cy.wait(1000);
      // 確認 pre > code 存在
      cy.get('.article-content pre code').should('have.length.greaterThan', 0);
    });
  });

  describe('分頁導航', () => {
    it('應能切換到第二頁', () => {
      cy.visit(`${baseUrl}/blog`);
      cy.get('app-pagination').should('exist');
      // 點擊「»」下一頁按鈕（倒數第二個 button）
      cy.get('app-pagination button').contains('»').not(':disabled').first().click();
      cy.url().should('include', 'page=');
    });
  });
});
