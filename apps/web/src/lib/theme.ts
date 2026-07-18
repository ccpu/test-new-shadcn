export { useTheme } from 'next-themes';

export type Theme = 'light' | 'dark' | 'system';

export const THEME_OPTIONS = [
  { value: 'light', label: 'Light', icon: '☀️' },
  { value: 'dark', label: 'Dark', icon: '🌙' },
  { value: 'system', label: 'System', icon: '🖥️' },
] as const;
