import { type ReactNode, useState } from 'react';
import type { AppSettings } from '@/context';
import { AppSettingsContext } from '@/context';

const defaultSettings: AppSettings = {
  theme: 'light',
  language: 'en',
  notificationsEnabled: true,
};


interface AppSettingsProviderProps {
  children: ReactNode;
}

export function AppSettingsProvider({ children }: AppSettingsProviderProps) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const value = {
    settings,
    updateSettings,
  };

  return <AppSettingsContext.Provider value={value}>{children}</AppSettingsContext.Provider>;
}
