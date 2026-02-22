import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, ActivatedRoute, Router } from '@angular/router';
import { provideIcons, NgIconComponent } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import { finalize, filter, switchMap } from 'rxjs';
import { AdminArticleService } from 'src/app/shared/api/admin-article/admin-article.service';
import { ProjectExperiences } from 'src/app/shared/api/admin-project-experience/admin-project-experience.model';
import { AdminProjectExperienceService } from 'src/app/shared/api/admin-project-experience/admin-project-experience.service';
import { Articles } from 'src/app/shared/api/article/article.model';
import { ErrorComponent } from 'src/app/shared/component/error/error.component';
import { InputComponent } from 'src/app/shared/component/form/input/input.component';
import { PaginationComponent } from 'src/app/shared/component/pagination/pagination.component';
import { DayJsPipe } from 'src/app/shared/pipe/day-js.pipe';
import { ApiService } from 'src/app/shared/service/api.service';
import { SwalService, SwalIcon } from 'src/app/shared/service/swal.service';

@Component({
  selector: 'app-project-experience-detail',
  templateUrl: './project-experience-detail.component.html',
  styleUrls: ['./project-experience-detail.component.scss'],
  standalone: true,
  providers: [provideIcons({ heroPencilSquare, heroTrash })],
  imports: [
    CommonModule,
    NgIconComponent,
    ErrorComponent,
    PaginationComponent,
    DayJsPipe,
    RouterOutlet,
    RouterLink,
    FormsModule,
    InputComponent,
  ],
})
export class ProjectExperienceDetailComponent {
  projectExperienceSrv = inject(AdminProjectExperienceService);
  apiSrv = inject(ApiService);
  swalSrv = inject(SwalService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  total = signal(0);
  projectExperiences = signal<ProjectExperiences>([]);
  isLoading = signal(false);
  isError = signal(false);
  page = signal(1);
  private _destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(params => {
      const page = params.get('page');
      const num = page ? parseInt(page) : 1;
      this.page.set(isNaN(num) ? 1 : num);
      this.getProjectExperience(this.page());
    });
  }

  getProjectExperience(page: number) {
    this.isError.set(false);
    this.isLoading.set(true);
    this.projectExperienceSrv
      .getProjectExperience(page)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        next: res => {
          if (this.apiSrv.ifSuccess(res, false)) {
            const {
              data: { total, projectExperiences },
            } = res;
            this.total.set(total);
            this.projectExperiences.set(projectExperiences);
          } else {
            this.isError.set(true);
          }
        },
        error: () => {
          this.isError.set(true);
        },
      });
  }

  paginationChange(page?: number) {
    this.router.navigate(['/setting/project-experience/detail'], {
      queryParams: {
        page,
      },
    });
  }

  deleteProjectExperience(id: number) {
    this.swalSrv
      .confirm({
        text: '確定要刪除專案經歷嗎?',
      })
      .pipe(
        filter(({ isConfirmed }) => isConfirmed),
        switchMap(() => this.projectExperienceSrv.deleteProjectExperience(id)),
        filter(res => this.apiSrv.ifSuccess(res)),
        switchMap(res => this.swalSrv.alert({ icon: SwalIcon.Success, text: res.returnMessage })),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => this.paginationChange(1));
  }

  search() {
    this.paginationChange(1);
  }
}
