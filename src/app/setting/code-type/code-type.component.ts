import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-code-type',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './code-type.component.html',
  styleUrls: ['./code-type.component.scss'],
})
export class CodeTypeComponent {}
