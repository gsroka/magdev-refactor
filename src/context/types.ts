export interface AppSettings {
  theme: 'light' | 'dark';
  language: string;
  notificationsEnabled: boolean;
}

export interface AppSettingsContextType {
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
}
