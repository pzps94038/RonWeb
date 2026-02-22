import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AdminProjectExperienceService } from './admin-project-experience.service';

describe('AdminProjectExperienceService', () => {
  let service: AdminProjectExperienceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AdminProjectExperienceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
