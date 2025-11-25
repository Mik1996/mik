import { LanguageType } from '../models/language-name.type';
import { ModeNameType } from '../models/mode-name.type';
import { ThemeNameType } from '../models/theme-name.type';
import { Option } from './types';

export enum LocalStorageKey {
  THEME = 'theme',
  MODE = 'mode',
}
// #region THEME
export const DEFAULT_THEME: Option<ThemeNameType> = { id: 'default', description: 'default' };

const unsortedThemes: Option<ThemeNameType>[] = [
  DEFAULT_THEME,
  { id: 'blue', description: 'blue' },
  { id: 'green', description: 'green' },
  { id: 'orange', description: 'orange' },
  { id: 'red', description: 'red' },
  { id: 'purple', description: 'purple' },
  { id: 'cyan', description: 'cyan' },
  { id: 'yellow', description: 'yellow' },
];

export const THEMES = unsortedThemes.sort((a, b) => {
  if (a.id === DEFAULT_THEME.id) return -1;
  if (b.id === DEFAULT_THEME.id) return 1;
  return a.id.localeCompare(b.id);
});
// #endregion

// #region MODE
export const DEFAULT_MODE: Option<ModeNameType> = { id: 'light', description: 'light' };

export const MODES: Option<ModeNameType>[] = [DEFAULT_MODE, { id: 'dark', description: 'dark' }];

// #endregion

// #region LANGUAGE
export const DEFAULT_LANGUAGE: Option<LanguageType> = { id: 'it', description: 'italian' };

export const LANGUAGES: Option<LanguageType>[] = [DEFAULT_LANGUAGE, { id: 'en', description: 'english' }];
// #endregion
