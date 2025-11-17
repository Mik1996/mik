import { ModeNameType } from "../models/mode-name.type";
import { ThemeNameType } from "../models/theme-name.type";

export enum LocalStorageKey {
  THEME = 'theme',
  MODE = 'mode',
}

const unsortedThemes: ThemeNameType[] = [
  'default',
  'blue',
  'green',
  'orange',
  'red',
  'purple',
  'cyan',
  'yellow',
];

export const THEMES = unsortedThemes.sort((a, b) => {
  if (a === 'default') return -1;
  if (b === 'default') return 1;
  return a.localeCompare(b);
});

export const INITIAL_THEME = THEMES[0];

export const MODES: ModeNameType[] = [
  'light',
  'dark'
];

export const INITIAL_MODE = MODES[0];
