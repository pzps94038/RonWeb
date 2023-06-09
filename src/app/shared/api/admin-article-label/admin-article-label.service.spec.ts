import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { ReturnCode } from '../shared/shared.model';
import { GetArticleLabelByIdResponse, GetArticleLabelResponse } from './admin-article-label.model';
import { HttpClient } from '@angular/common/http';
import { AdminArticleLabelService } from './admin-article-label.service';

describe('AdminArticleLabelService', () => {
  let service: AdminArticleLabelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(AdminArticleLabelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('測試標籤更新', fakeAsync(() => {
    const spy = spyOn((service as any).http as HttpClient, 'patch');
    service.updateArticleLabel({ labelId: 1, labelName: '測試', userId: 1 });
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('測試標籤創建', fakeAsync(() => {
    const spy = spyOn((service as any).http as HttpClient, 'post');
    service.createArticleLabel({ labelName: '測試', userId: 1 });
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('測試標籤刪除', fakeAsync(() => {
    const spy = spyOn((service as any).http as HttpClient, 'delete');
    service.deleteArticleLabel(1);
    tick();
    expect(spy).toHaveBeenCalled();
  }));
});
