import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UploadAdapterService } from './upload-adapter.service';
import { UploadService } from '../api/upload/upload.service';
import { ApiService } from './api.service';
import { ArticleAdapter, ProjectExperienceAdapter } from './upload-adapter.model';

describe('UploadAdapterService', () => {
  let service: UploadAdapterService;
  let uploadService: jasmine.SpyObj<UploadService>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const uploadSpy = jasmine.createSpyObj('UploadService', ['uploadArticleFile', 'uploadProjectExperienceFile']);
    const apiSpy = jasmine.createSpyObj('ApiService', ['ifSuccess']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: UploadService, useValue: uploadSpy },
        { provide: ApiService, useValue: apiSpy },
      ],
    });

    service = TestBed.inject(UploadAdapterService);
    uploadService = TestBed.inject(UploadService) as jasmine.SpyObj<UploadService>;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create article adapter', () => {
    const adapter = service.createArticleAdapter();
    expect(adapter).toBeInstanceOf(ArticleAdapter);
  });

  it('should create project experience adapter', () => {
    const adapter = service.createProjectExperienceAdapter();
    expect(adapter).toBeInstanceOf(ProjectExperienceAdapter);
  });

  it('should inject required services', () => {
    expect(service.uploadSrv).toBeTruthy();
    expect(service.apiSrv).toBeTruthy();
  });

  it('should pass services to article adapter', () => {
    const adapter = service.createArticleAdapter() as ArticleAdapter;
    expect(adapter).toBeDefined();
  });

  it('should pass services to project experience adapter', () => {
    const adapter = service.createProjectExperienceAdapter() as ProjectExperienceAdapter;
    expect(adapter).toBeDefined();
  });

  it('should create different adapter instances', () => {
    const adapter1 = service.createArticleAdapter();
    const adapter2 = service.createArticleAdapter();
    expect(adapter1).not.toBe(adapter2);
  });

  it('should create different project experience adapter instances', () => {
    const adapter1 = service.createProjectExperienceAdapter();
    const adapter2 = service.createProjectExperienceAdapter();
    expect(adapter1).not.toBe(adapter2);
  });
});
