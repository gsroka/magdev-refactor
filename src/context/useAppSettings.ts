import { useContext } from 'react';
import { AppSettingsContext } from '@/context';

export function useAppSettings() {
  const context = useContext(AppSettingsContext);
  if (context === undefined) {
    throw new Error('useAppSettings must be used within AppSettingsProvider');
  }
  return context;
}
