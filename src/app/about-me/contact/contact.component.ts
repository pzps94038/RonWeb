import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from 'src/app/shared/components/form/input/input.component';
import { TextAreaComponent } from 'src/app/shared/components/form/text-area/text-area.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, TextAreaComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  form = new FormGroup({
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const subject = this.form.get('subject')?.value;
      const message = this.form.get('message')?.value;
      window.location.href = `mailto:pzps94038@yahoo.com.tw?subject=${subject}&body=${message}`;
    }
  }
}
