import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { ScrollAnimateDirective } from 'src/app/shared/directive/scroll-animate.directive';
import { ProjectExperienceService } from 'src/app/shared/api/project-experience/project-experience.service';
import { ProjectExperienceItem } from 'src/app/shared/api/project-experience/project-experience.model';
import { ApiService } from 'src/app/shared/service/api.service';
import { SafePipe } from 'src/app/shared/pipe/safe.pipe';
import { ErrorComponent } from 'src/app/shared/component/error/error.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ScrollAnimateDirective, SafePipe, ErrorComponent],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
  private projectExperienceSrv = inject(ProjectExperienceService);
  private apiSrv = inject(ApiService);
  private _destroyRef = inject(DestroyRef);

  projectExperiences = signal<ProjectExperienceItem[]>([]);
  isLoading = signal(false);
  isError = signal(false);

  ngOnInit() {
    this.loadProjectExperiences();
  }

  /**
   * 載入專案經歷列表
   */
  private loadProjectExperiences() {
    this.isError.set(false);
    this.isLoading.set(true);
    this.projectExperienceSrv
      .getProjectExperiences()
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        next: res => {
          if (this.apiSrv.ifSuccess(res, false)) {
            this.projectExperiences.set(res.data.projectExperiences);
          } else {
            this.isError.set(true);
          }
        },
        error: () => {
          this.isError.set(true);
        },
      });
  }
}
