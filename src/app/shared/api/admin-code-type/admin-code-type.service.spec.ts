import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdminCodeTypeService } from './admin-code-type.service';
import { environment } from 'src/environments/environment';
import {
  CreateAdminCodeTypeRequest,
  GetAdminCodeTypeByIdResponse,
  GetAdminCodeTypeResponse,
  UpdateAdminCodeTypeRequest,
  AdminCodeTypeResponse,
} from './admin-code-type.model';
import { BaseMessageResponse, ReturnCode } from '../shared/shared.model';

describe('AdminCodeTypeService', () => {
  let service: AdminCodeTypeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminCodeTypeService],
    });
    service = TestBed.inject(AdminCodeTypeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAdminCodeType', () => {
    it('should get admin code types without pagination', () => {
      const mockResponse: GetAdminCodeTypeResponse = {
        data: {
          total: 0,
          codeTypes: [],
        },
        returnCode: ReturnCode.Success,
        returnMessage: 'Success',
      };

      service.getAdminCodeType().subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/adminCodeType`);
      expect(req.request.method).toBe('GET');
      expect(req.request.params.keys()).toEqual([]);
      req.flush(mockResponse);
    });

    it('should get admin code types with pagination', () => {
      const mockResponse: GetAdminCodeTypeResponse = {
        data: {
          total: 1,
          codeTypes: [{
            id: 1,
            codeTypeId: 'TEST',
            codeTypeName: 'Test Type',
            createDate: '2023-01-01',
            createBy: 1,
          }],
        },
        returnCode: ReturnCode.Success,
        returnMessage: 'Success',
      };

      service.getAdminCodeType(1).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/adminCodeType?page=1`);
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('page')).toBe('1');
      req.flush(mockResponse);
    });
  });

  describe('getAdminCodeTypeById', () => {
    it('should get admin code type by id', () => {
      const mockResponse: GetAdminCodeTypeByIdResponse = {
        data: {
          id: 1,
          codeTypeId: 'TEST',
          codeTypeName: 'Test Type',
          createDate: '2023-01-01',
          createBy: 1,
          updateDate: '2023-01-02',
          updateBy: 1,
        },
        returnCode: ReturnCode.Success,
        returnMessage: 'Success',
      };

      service.getAdminCodeTypeById(1).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/adminCodeType/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('updateAdminCodeType', () => {
    it('should update admin code type', () => {
      const updateRequest: UpdateAdminCodeTypeRequest = {
        codeTypeId: 'UPDATED',
        codeTypeName: 'Updated Type',
        userId: 1,
      };
      const mockResponse: BaseMessageResponse = {
        returnCode: ReturnCode.Success,
        returnMessage: 'Success',
      };

      service.updateAdminCodeType(1, updateRequest).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/adminCodeType/1`);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual(updateRequest);
      req.flush(mockResponse);
    });
  });

  describe('createAdminCodeType', () => {
    it('should create admin code type', () => {
      const createRequest: CreateAdminCodeTypeRequest = {
        codeTypeId: 'NEW',
        codeTypeName: 'New Type',
        userId: 1,
      };
      const mockResponse: BaseMessageResponse = {
        returnCode: ReturnCode.Success,
        returnMessage: 'Success',
      };

      service.createAdminCodeType(createRequest).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/adminCodeType`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(createRequest);
      req.flush(mockResponse);
    });
  });

  describe('deleteAdminCodeType', () => {
    it('should delete admin code type', () => {
      const mockResponse: BaseMessageResponse = {
        returnCode: ReturnCode.Success,
        returnMessage: 'Success',
      };

      service.deleteAdminCodeType(1).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/adminCodeType/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockResponse);
    });
  });

  describe('error handling', () => {
    it('should handle HTTP errors', () => {
      service.getAdminCodeType().subscribe({
        next: () => fail('Should have failed'),
        error: (error) => {
          expect(error.status).toBe(404);
        }
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/adminCodeType`);
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });
});
