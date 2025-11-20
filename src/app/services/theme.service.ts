import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';
import { ModeNameType } from '../models/mode-name.type';
import { ThemeNameType } from '../models/theme-name.type';
import { DEFAULT_MODE, DEFAULT_THEME, LocalStorageKey, MODES, THEMES } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  readonly selectedTheme = signal<ThemeNameType>(
    THEMES.find((theme) => localStorage.getItem(LocalStorageKey.THEME) === theme) ?? DEFAULT_THEME
  );

  readonly selectedMode = signal<ModeNameType>(
    MODES.find((mode) => localStorage.getItem(LocalStorageKey.MODE) === mode) ?? DEFAULT_MODE
  );

  constructor() {
    effect(() => {
      const theme = this.selectedTheme();
      this.document.documentElement.classList.add(theme);
      localStorage.setItem(LocalStorageKey.THEME, theme);
    });

    effect(() => {
      const mode = this.selectedMode();
      this.document.documentElement.classList.add(mode);
      localStorage.setItem(LocalStorageKey.MODE, mode);
    });
  }

  setTheme = (themeName: ThemeNameType) => {
    if (this.selectedTheme() === themeName) return;
    this.document.documentElement.classList.remove(this.selectedTheme());
    this.selectedTheme.set(themeName);
  };

  setMode = (modeName: ModeNameType) => {
    if (this.selectedMode() === modeName) return;
    this.document.documentElement.classList.remove(this.selectedMode());
    this.selectedMode.set(modeName);
  };
}
