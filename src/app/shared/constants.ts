import { LanguageType } from '../models/language-name.type';
import { ModeNameType } from '../models/mode-name.type';
import { ThemeNameType } from '../models/theme-name.type';

export enum LocalStorageKey {
  THEME = 'theme',
  MODE = 'mode',
}
// #region THEME
export const DEFAULT_THEME: ThemeNameType = 'default';

const unsortedThemes: ThemeNameType[] = [DEFAULT_THEME, 'blue', 'green', 'orange', 'red', 'purple', 'cyan', 'yellow'];

export const THEMES = unsortedThemes.sort((a, b) => {
  if (a === DEFAULT_THEME) return -1;
  if (b === DEFAULT_THEME) return 1;
  return a.localeCompare(b);
});

// #endregion

// #region MODE
export const MODES: ModeNameType[] = ['light', 'dark'];

export const DEFAULT_MODE: ModeNameType = 'light';
// #endregion

// #region LANGUAGE
export const DEFAULT_LANGUAGE: LanguageType = 'it';

export const LANGUAGES: LanguageType[] = [DEFAULT_LANGUAGE, 'en'];
// #endregion
