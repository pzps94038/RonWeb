import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SharedService } from './shared/service/shared.service';
import { ToggleModeComponent } from './shared/component/toggle-mode/toggle-mode.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterOutlet, ToggleModeComponent],
})
export class AppComponent implements OnInit {
  sharedSrv = inject(SharedService);

  ngOnInit(): void {
    const token = this.sharedSrv.getToken();
    const isLogin = !!token;
    this.sharedSrv.isLogin.set(isLogin);
  }
}
