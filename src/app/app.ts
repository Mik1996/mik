import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from './form/form';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App {
  protected readonly title = signal('mik');
}
