import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useModelStore from '../stores/modelStore';
import useTradingStore from '../stores/tradingStore';
import ModelInfo from '../components/model/ModelInfo';
import SignalCard from '../components/trading/SignalCard';
import { LineChart, Activity, Users, Cpu, RefreshCw } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { fetchModels, activeModel, models } = useModelStore();
  const { fetchSignals, signals } = useTradingStore();

  useEffect(() => {
    fetchModels();
    fetchSignals();
  }, [fetchModels, fetchSignals]);

  if (!activeModel) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-6">{t('dashboard.title')}</h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-dark-800 rounded-lg p-4 shadow-md">
                <div className="flex items-center mb-2">
                  <LineChart className="h-5 w-5 text-primary-500 mr-2" />
                  <h3 className="text-sm font-medium">Win Rate</h3>
                </div>
                <p className="text-2xl font-bold">{(activeModel.performance.winRate * 100).toFixed(1)}%</p>
                <div className="mt-2 text-xs text-success-400">
                  +{(activeModel.performance.improvementFromPrevious * 100).toFixed(1)}% from prev
                </div>
              </div>
              
              <div className="bg-dark-800 rounded-lg p-4 shadow-md">
                <div className="flex items-center mb-2">
                  <Activity className="h-5 w-5 text-primary-500 mr-2" />
                  <h3 className="text-sm font-medium">Profit Factor</h3>
                </div>
                <p className="text-2xl font-bold">{activeModel.performance.profitFactor.toFixed(2)}</p>
                <div className="mt-2 text-xs text-success-400">
                  +0.25 from prev model
                </div>
              </div>
              
              <div className="bg-dark-800 rounded-lg p-4 shadow-md">
                <div className="flex items-center mb-2">
                  <Users className="h-5 w-5 text-primary-500 mr-2" />
                  <h3 className="text-sm font-medium">Total Trades</h3>
                </div>
                <p className="text-2xl font-bold">{activeModel.performance.totalTrades}</p>
                <div className="mt-2 text-xs text-gray-400">
                  Last 30 days
                </div>
              </div>
              
              <div className="bg-dark-800 rounded-lg p-4 shadow-md">
                <div className="flex items-center mb-2">
                  <Cpu className="h-5 w-5 text-primary-500 mr-2" />
                  <h3 className="text-sm font-medium">Avg. Profit</h3>
                </div>
                <p className="text-2xl font-bold">{activeModel.performance.averageProfit.toFixed(2)}%</p>
                <div className="mt-2 text-xs text-success-400">
                  +0.13% from prev
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{t('dashboard.recentSignals')}</h2>
              <button className="flex items-center text-xs text-primary-400 hover:text-primary-300">
                <RefreshCw className="h-3 w-3 mr-1" />
                Refresh
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {signals.slice(0, 4).map(signal => (
                <SignalCard key={signal.id} signal={signal} />
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-dark-800 rounded-lg p-4 shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">{t('dashboard.activeModel')}</h2>
            <ModelInfo model={activeModel} />
          </div>
          
          <div className="bg-dark-800 rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-4">{t('dashboard.modelVersion')}</h2>
            
            <div className="space-y-3">
              {models.slice(0, 3).map(model => (
                <div 
                  key={model.id}
                  className={`flex items-center p-3 rounded-lg ${
                    model.isActive ? 'bg-primary-900 bg-opacity-40' : 'bg-dark-700'
                  }`}
                >
                  <div className="mr-3">
                    <div className={`
                      h-8 w-8 rounded-full flex items-center justify-center
                      ${model.isActive ? 'bg-primary-600' : 'bg-dark-600'}
                    `}>
                      <Cpu className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{model.version}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(model.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-success-400">
                      +{(model.performance.improvementFromPrevious * 100).toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-400">
                      {model.performance.totalTrades} trades
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;