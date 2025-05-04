import { create } from 'zustand';
import { UserSettings } from '../types';

interface UIState {
  settings: UserSettings;
  isSettingsOpen: boolean;
  isMobileMenuOpen: boolean;
  theme: 'light' | 'dark';
  language: 'en' | 'ar';
  
  // Actions
  toggleSettings: () => void;
  toggleMobileMenu: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: 'en' | 'ar') => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
}

const defaultSettings: UserSettings = {
  language: 'en',
  theme: 'dark',
  riskTolerance: 0.5,
  defaultPairs: ['EURUSD', 'GBPUSD', 'USDJPY'],
  notifications: true,
};

const useUIStore = create<UIState>((set) => ({
  settings: defaultSettings,
  isSettingsOpen: false,
  isMobileMenuOpen: false,
  theme: 'dark',
  language: 'en',
  
  toggleSettings: () => set(state => ({ isSettingsOpen: !state.isSettingsOpen })),
  
  toggleMobileMenu: () => set(state => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  
  setTheme: (theme) => set(state => ({ 
    theme,
    settings: { ...state.settings, theme } 
  })),
  
  setLanguage: (language) => set(state => ({ 
    language,
    settings: { ...state.settings, language } 
  })),
  
  updateSettings: (settings) => set(state => ({ 
    settings: { ...state.settings, ...settings } 
  })),
}));

export default useUIStore;