import React from 'react';
import { useTranslation } from 'react-i18next';
import useUIStore from '../stores/uiStore';
import { Save, Globe, Moon, Sun, Bell, Lock, Server, ShieldAlert, AlertCircle } from 'lucide-react';

const Settings: React.FC = () => {
  const { t } = useTranslation();
  const { settings, updateSettings, setTheme, setLanguage, theme } = useUIStore();

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
  };

  const handleLanguageChange = (newLanguage: 'en' | 'ar') => {
    setLanguage(newLanguage);
  };

  const handleRiskToleranceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    updateSettings({ riskTolerance: value });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-6">{t('settings.title')}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-dark-800 rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-6">
                <Globe className="h-5 w-5 text-primary-500 mr-3" />
                <h2 className="text-xl font-semibold">{t('settings.language')}</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`p-4 rounded-lg border-2 ${
                    settings.language === 'en' 
                      ? 'border-primary-500 bg-primary-900 bg-opacity-20' 
                      : 'border-dark-700 hover:border-dark-600'
                  }`}
                >
                  <div className="font-medium mb-1">English</div>
                  <div className="text-xs text-gray-400">Use English language</div>
                </button>
                
                <button
                  onClick={() => handleLanguageChange('ar')}
                  className={`p-4 rounded-lg border-2 ${
                    settings.language === 'ar' 
                      ? 'border-primary-500 bg-primary-900 bg-opacity-20' 
                      : 'border-dark-700 hover:border-dark-600'
                  }`}
                >
                  <div className="font-medium mb-1">العربية</div>
                  <div className="text-xs text-gray-400">استخدم اللغة العربية</div>
                </button>
              </div>
            </div>
            
            <div className="bg-dark-800 rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-6">
                {theme === 'dark' ? (
                  <Moon className="h-5 w-5 text-primary-500 mr-3" />
                ) : (
                  <Sun className="h-5 w-5 text-primary-500 mr-3" />
                )}
                <h2 className="text-xl font-semibold">{t('settings.theme')}</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`p-4 rounded-lg border-2 ${
                    settings.theme === 'light' 
                      ? 'border-primary-500 bg-primary-900 bg-opacity-20' 
                      : 'border-dark-700 hover:border-dark-600'
                  }`}
                >
                  <div className="font-medium mb-1">Light</div>
                  <div className="text-xs text-gray-400">Light theme for daytime trading</div>
                </button>
                
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`p-4 rounded-lg border-2 ${
                    settings.theme === 'dark' 
                      ? 'border-primary-500 bg-primary-900 bg-opacity-20' 
                      : 'border-dark-700 hover:border-dark-600'
                  }`}
                >
                  <div className="font-medium mb-1">Dark</div>
                  <div className="text-xs text-gray-400">Dark theme for nighttime trading</div>
                </button>
              </div>
            </div>
            
            <div className="bg-dark-800 rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-6">
                <AlertCircle className="h-5 w-5 text-primary-500 mr-3" />
                <h2 className="text-xl font-semibold">{t('settings.riskSettings')}</h2>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Risk Tolerance</label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={settings.riskTolerance}
                  onChange={handleRiskToleranceChange}
                  className="w-full h-2 bg-dark-700 rounded-full appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs mt-1">
                  <span>Low Risk</span>
                  <span>Medium Risk</span>
                  <span>High Risk</span>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Default Position Size</label>
                <select className="w-full px-3 py-2 bg-dark-700 rounded-md border border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="micro">Micro (0.01 lots)</option>
                  <option value="mini">Mini (0.1 lots)</option>
                  <option value="standard">Standard (1.0 lot)</option>
                  <option value="adaptive">Adaptive (AI controlled)</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Maximum Drawdown Limit</label>
                <select className="w-full px-3 py-2 bg-dark-700 rounded-md border border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="5">5% of account</option>
                  <option value="10">10% of account</option>
                  <option value="15">15% of account</option>
                  <option value="20">20% of account</option>
                </select>
              </div>
              
              <p className="text-xs text-gray-400">
                These settings control how the AI manages risk in your trading account.
                Higher risk tolerance may lead to larger profits but also potentially larger drawdowns.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-dark-800 rounded-lg p-4 shadow-md">
              <div className="flex items-center mb-4">
                <Bell className="h-5 w-5 text-primary-500 mr-2" />
                <h3 className="text-lg font-semibold">{t('settings.notifications')}</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm">Signal Alerts</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={true} className="sr-only peer" />
                    <div className="w-11 h-6 bg-dark-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm">Performance Updates</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={true} className="sr-only peer" />
                    <div className="w-11 h-6 bg-dark-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm">Evolution Events</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={true} className="sr-only peer" />
                    <div className="w-11 h-6 bg-dark-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm">Market News</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={false} className="sr-only peer" />
                    <div className="w-11 h-6 bg-dark-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="bg-dark-800 rounded-lg p-4 shadow-md">
              <div className="flex items-center mb-4">
                <Server className="h-5 w-5 text-primary-500 mr-2" />
                <h3 className="text-lg font-semibold">{t('settings.apiConnections')}</h3>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 rounded-md bg-dark-700 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">MetaTrader 4</p>
                    <p className="text-xs text-gray-400">Connected</p>
                  </div>
                  <button className="text-xs text-primary-400 hover:text-primary-300">Disconnect</button>
                </div>
                
                <div className="p-3 rounded-md bg-dark-700 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">OANDA</p>
                    <p className="text-xs text-gray-400">Not connected</p>
                  </div>
                  <button className="text-xs text-primary-400 hover:text-primary-300">Connect</button>
                </div>
                
                <div className="p-3 rounded-md bg-dark-700 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">cTrader</p>
                    <p className="text-xs text-gray-400">Not connected</p>
                  </div>
                  <button className="text-xs text-primary-400 hover:text-primary-300">Connect</button>
                </div>
              </div>
            </div>
            
            <div className="bg-dark-800 rounded-lg p-4 shadow-md">
              <div className="flex items-center mb-4">
                <Lock className="h-5 w-5 text-primary-500 mr-2" />
                <h3 className="text-lg font-semibold">{t('settings.securitySettings')}</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Session Timeout</label>
                  <select className="w-full px-3 py-2 bg-dark-700 rounded-md border border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <ShieldAlert className="h-4 w-4 text-warning-500 mr-1" />
                    <label className="block text-sm font-medium">Sandbox Mode</label>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer mb-2">
                    <input type="checkbox" checked={true} className="sr-only peer" />
                    <div className="w-11 h-6 bg-dark-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-warning-600"></div>
                  </label>
                  <p className="text-xs text-gray-400">
                    Sandbox mode prevents actual trading and only simulates signals.
                    Disable this to allow live trading.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button className="w-full py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center justify-center">
                <Save className="h-5 w-5 mr-2" />
                {t('common.save')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;