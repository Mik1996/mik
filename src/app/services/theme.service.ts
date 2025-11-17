import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';
import { LocalStorageKey, THEMES } from '../shared/constants';
import { ThemeNameType } from '../models/theme-name.type';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  private readonly selectedTheme = signal<ThemeNameType>(
    THEMES.find((theme) => localStorage.getItem(LocalStorageKey.THEME) === theme) ?? 'default'
  );

  constructor() {
    effect(() => {
      const theme = this.selectedTheme();
      this.document.body.classList.add(theme);
      localStorage.setItem(LocalStorageKey.THEME, theme);
      console.log('Selected theme:', theme);
    });
  }

  setTheme = (themeName: ThemeNameType) => {
    if (this.selectedTheme() === themeName) return;
    this.document.body.classList.remove(themeName);
    this.selectedTheme.set(themeName);
  };
}
