import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useTradingStore from '../stores/tradingStore';
import SignalCard from '../components/trading/SignalCard';
import { Zap, Clock, CheckCircle, Filter } from 'lucide-react';

const Signals: React.FC = () => {
  const { t } = useTranslation();
  const { fetchSignals, signals } = useTradingStore();

  useEffect(() => {
    fetchSignals();
  }, [fetchSignals]);

  const newSignals = signals.filter(signal => signal.status === 'new');
  const activeSignals = signals.filter(signal => signal.status === 'active');
  const closedSignals = signals.filter(signal => signal.status === 'closed');

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('signals.title')}</h1>
        
        <div className="flex items-center space-x-2">
          <button className="flex items-center px-3 py-2 bg-dark-800 rounded-md text-sm hover:bg-dark-700">
            <Filter className="h-4 w-4 mr-2" />
            {t('common.filter')}
          </button>
          <select className="px-3 py-2 rounded-md bg-dark-800 text-white border border-dark-700 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm">
            <option value="all">All Pairs</option>
            <option value="EURUSD">EURUSD</option>
            <option value="GBPUSD">GBPUSD</option>
            <option value="USDJPY">USDJPY</option>
            <option value="AUDUSD">AUDUSD</option>
          </select>
        </div>
      </div>
      
      {newSignals.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Zap className="h-5 w-5 text-accent-500 mr-2" />
            <h2 className="text-xl font-semibold">{t('signals.newSignals')}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newSignals.map(signal => (
              <SignalCard key={signal.id} signal={signal} />
            ))}
          </div>
        </div>
      )}
      
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Clock className="h-5 w-5 text-primary-500 mr-2" />
          <h2 className="text-xl font-semibold">{t('signals.activeSignals')}</h2>
        </div>
        
        {activeSignals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeSignals.map(signal => (
              <SignalCard key={signal.id} signal={signal} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-dark-800 rounded-lg">
            <p className="text-gray-400">No active signals at the moment</p>
            <p className="text-sm text-gray-500 mt-2">New signals will appear here once generated</p>
          </div>
        )}
      </div>
      
      <div>
        <div className="flex items-center mb-4">
          <CheckCircle className="h-5 w-5 text-success-500 mr-2" />
          <h2 className="text-xl font-semibold">{t('signals.closedSignals')}</h2>
        </div>
        
        {closedSignals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {closedSignals.map(signal => (
              <SignalCard key={signal.id} signal={signal} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-dark-800 rounded-lg">
            <p className="text-gray-400">No closed signals yet</p>
            <p className="text-sm text-gray-500 mt-2">Completed signals will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signals;