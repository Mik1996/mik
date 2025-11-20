import { LanguageType } from './language-name.type';
import { ModeNameType } from './mode-name.type';
import { ThemeNameType } from './theme-name.type';

export interface SettingsForm {
  theme: ThemeNameType;
  mode: ModeNameType;
  language: LanguageType;
}
