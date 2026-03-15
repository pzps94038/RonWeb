import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ProjectExperienceService } from './project-experience.service';
import { GetProjectExperienceListResponse } from './project-experience.model';
import { ReturnCode } from '../shared/shared.model';

describe('ProjectExperienceService', () => {
  let service: ProjectExperienceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProjectExperienceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('測試取得專案經歷列表', fakeAsync(() => {
    const fake = of({
      returnCode: ReturnCode.Success,
      returnMessage: 'msg',
    }) as Observable<GetProjectExperienceListResponse>;
    const spy = spyOn((service as any).http as HttpClient, 'get').and.returnValue(fake);
    service.getProjectExperiences();
    tick();
    expect(spy).toHaveBeenCalled();
  }));
});
