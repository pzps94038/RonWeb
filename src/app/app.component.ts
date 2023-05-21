import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToggleModeComponent } from './shared/component/toggle-mode/toggle-mode.component';
import { UserService } from './shared/service/user.service';
import { HeaderComponent } from './shared/component/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterOutlet, ToggleModeComponent, HeaderComponent],
})
export class AppComponent {
  userSrv = inject(UserService);

  constructor() {
    const token = this.userSrv.getToken();
    const isLogin = !!token;
    this.userSrv.isLogin.set(isLogin);
  }
}
