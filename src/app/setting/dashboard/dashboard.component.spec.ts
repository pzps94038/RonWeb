import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { of, throwError } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { DashboardService } from 'src/app/shared/api/dashboard/dashboard.service';
import { ApiService } from 'src/app/shared/service/api.service';
import { ReturnCode } from 'src/app/shared/api/shared/shared.model';
import { GetDashboardResponse, DashboardData } from 'src/app/shared/api/dashboard/dashboard.model';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dashboardSrvSpy: jasmine.SpyObj<DashboardService>;
  let apiSrvSpy: jasmine.SpyObj<ApiService>;

  const mockDashboardData: DashboardData = {
    totalArticles: 10,
    totalCategories: 3,
    totalLabels: 5,
    totalViewCount: 100,
    topViewedArticles: [],
    monthlyArticleTrend: [
      { year: 2026, month: 1, count: 5 },
      { year: 2026, month: 2, count: 3 },
    ],
    categoryDistribution: [{ categoryId: 1, categoryName: '技術', articleCount: 7 }],
  };

  const mockSuccessResponse: GetDashboardResponse = {
    returnCode: ReturnCode.Success,
    returnMessage: '',
    data: mockDashboardData,
  };

  beforeEach(async () => {
    dashboardSrvSpy = jasmine.createSpyObj('DashboardService', ['getDashboard']);
    apiSrvSpy = jasmine.createSpyObj('ApiService', ['ifSuccess']);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: DashboardService, useValue: dashboardSrvSpy },
        { provide: ApiService, useValue: apiSrvSpy },
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    }).compileComponents();
  });

  function createComponent() {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  }

  it('should create', () => {
    dashboardSrvSpy.getDashboard.and.returnValue(of(mockSuccessResponse));
    apiSrvSpy.ifSuccess.and.returnValue(true);
    createComponent();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('API 成功回傳後 dashboardData signal 正確設定', fakeAsync(() => {
    dashboardSrvSpy.getDashboard.and.returnValue(of(mockSuccessResponse));
    apiSrvSpy.ifSuccess.and.returnValue(true);
    createComponent();
    fixture.detectChanges();
    tick();
    expect(component.dashboardData()).toEqual(mockDashboardData);
    expect(component.isLoading()).toBeFalse();
    expect(component.isError()).toBeFalse();
  }));

  it('API 回傳失敗時 isError 為 true', fakeAsync(() => {
    dashboardSrvSpy.getDashboard.and.returnValue(of(mockSuccessResponse));
    apiSrvSpy.ifSuccess.and.returnValue(false);
    createComponent();
    fixture.detectChanges();
    tick();
    expect(component.isError()).toBeTrue();
    expect(component.isLoading()).toBeFalse();
  }));

  it('API 發生錯誤時 isError 為 true', fakeAsync(() => {
    dashboardSrvSpy.getDashboard.and.returnValue(throwError(() => new Error('Network error')));
    createComponent();
    fixture.detectChanges();
    tick();
    expect(component.isError()).toBeTrue();
    expect(component.isLoading()).toBeFalse();
  }));
});
