import { createContext } from 'react';
import type { AppSettingsContextType } from '@/context';

export const AppSettingsContext = createContext<AppSettingsContextType | undefined>(undefined);
