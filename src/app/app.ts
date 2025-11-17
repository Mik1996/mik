import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ThemeService } from './services/theme.service';
import { INITIAL_MODE, INITIAL_THEME } from './shared/constants';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly themeService = inject(ThemeService);

  constructor() {
    this.themeService.setTheme(INITIAL_THEME);
    this.themeService.setMode(INITIAL_MODE);
  }
}
