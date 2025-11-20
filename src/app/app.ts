import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { apply, customError, Field, form, required, schema, Schema, validate } from '@angular/forms/signals';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FormComponent } from './form/form.component';
import { LanguageType } from './models/language-name.type';
import { SettingsForm } from './models/theme-form.interface';
import { ThemeService } from './services/theme.service';
import { DEFAULT_LANGUAGE, DEFAULT_MODE, DEFAULT_THEME, LANGUAGES, MODES, THEMES } from './shared/constants';

const nameSchema: Schema<string> = schema((path) => {
  required(path, { message: 'REQUIRED_FIELD' });
});

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormComponent, Field, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly themeService = inject(ThemeService);
  private readonly translateService = inject(TranslateService);

  protected readonly themes = signal(THEMES);
  protected readonly modes = signal(MODES);
  protected readonly languages = signal(LANGUAGES);

  protected readonly data = signal<SettingsForm>({
    theme: this.themeService.selectedTheme() ?? DEFAULT_THEME,
    mode: this.themeService.selectedMode() ?? DEFAULT_MODE,
    language: (this.translateService.getCurrentLang() as LanguageType) ?? DEFAULT_LANGUAGE,
  });

  protected readonly form = form<SettingsForm>(this.data, (path) => {
    apply(path.theme, nameSchema);
    validate(path.theme, (c) => (THEMES.includes(c.value()) ? null : customError({ kind: 'theme', message: 'This theme cannot be found' })));
    apply(path.mode, nameSchema);
    validate(path.mode, (c) => (MODES.includes(c.value()) ? null : customError({ kind: 'mode', message: 'This mode cannot be found' })));
    apply(path.language, nameSchema);
    validate(path.language, (c) => (LANGUAGES.includes(c.value()) ? null : customError({ kind: 'language', message: 'This language cannot be found' })));
  });


  constructor() {
    effect(() => {
      const { theme, mode, language } = this.form().value();
      this.themeService.setTheme(theme);
      this.themeService.setMode(mode);
      this.translateService.use(language);
    });
  }
}
