import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';
import { LocalStorageKey, MODES, THEMES } from '../shared/constants';
import { ThemeNameType } from '../models/theme-name.type';
import { ModeNameType } from '../models/mode-name.type';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  private readonly selectedTheme = signal<ThemeNameType>(
    THEMES.find((theme) => localStorage.getItem(LocalStorageKey.THEME) === theme) ?? 'default'
  );

  private readonly selectedMode = signal<ModeNameType>(
    MODES.find((mode) => localStorage.getItem(LocalStorageKey.MODE) === mode) ?? 'light'
  );

  constructor() {
    effect(() => {
      const theme = this.selectedTheme();
      this.document.body.classList.add(theme);
      localStorage.setItem(LocalStorageKey.THEME, theme);
      console.log('Selected theme:', theme);
    });

    effect(() => {
      const mode = this.selectedMode();
      this.document.body.classList.add(mode);
      localStorage.setItem(LocalStorageKey.MODE, mode);
      console.log('Selected mode:', mode);
    });
  }

  setTheme = (themeName: ThemeNameType) => {
    if (this.selectedTheme() === themeName) return;
    this.document.body.classList.remove(themeName);
    this.selectedTheme.set(themeName);
  };

  setMode = (modeName: ModeNameType) => {
    if (this.selectedMode() === modeName) return;
    this.document.body.classList.remove(modeName);
    this.selectedMode.set(modeName);
  };
}
