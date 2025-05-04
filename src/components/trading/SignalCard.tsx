import React from 'react';
import { useTranslation } from 'react-i18next';
import { TradingSignal } from '../../types';
import { ArrowUp, ArrowDown, Info, Calendar, DollarSign } from 'lucide-react';

interface SignalCardProps {
  signal: TradingSignal;
}

const SignalCard: React.FC<SignalCardProps> = ({ signal }) => {
  const { t } = useTranslation();
  const isBuy = signal.direction === 'buy';
  
  return (
    <div className={`
      rounded-lg shadow-md overflow-hidden 
      ${isBuy ? 'bg-success-900 bg-opacity-20' : 'bg-error-900 bg-opacity-20'}
      transition-all duration-300 hover:shadow-lg
    `}>
      <div className={`
        px-4 py-3 flex justify-between items-center
        ${isBuy ? 'bg-success-900 bg-opacity-50' : 'bg-error-900 bg-opacity-50'}
      `}>
        <div className="flex items-center">
          <div className={`
            mr-3 p-1.5 rounded-full
            ${isBuy ? 'bg-success-500' : 'bg-error-500'}
          `}>
            {isBuy ? (
              <ArrowUp className="h-4 w-4 text-white" />
            ) : (
              <ArrowDown className="h-4 w-4 text-white" />
            )}
          </div>
          <div>
            <p className="font-bold text-lg">{signal.pair}</p>
            <p className="text-xs opacity-80">
              {new Date(signal.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
        <div className={`
          px-2 py-1 rounded-full text-xs font-medium
          ${signal.status === 'active' ? 'bg-primary-900 text-primary-300' : 
            signal.status === 'new' ? 'bg-accent-900 text-accent-300' : 
            'bg-dark-700 text-gray-300'}
        `}>
          {signal.status.toUpperCase()}
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <p className="text-xs opacity-70">{t('signals.entryPrice')}</p>
            <p className="font-semibold">{signal.entryPrice.toFixed(5)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs opacity-70">{t('signals.takeProfit')}</p>
            <p className="font-semibold text-success-400">{signal.takeProfit.toFixed(5)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs opacity-70">{t('signals.stopLoss')}</p>
            <p className="font-semibold text-error-400">{signal.stopLoss.toFixed(5)}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 opacity-70" />
            <span className="text-xs">{signal.modelVersion}</span>
          </div>
          <div className="flex items-center">
            <Info className="h-4 w-4 mr-1 opacity-70" />
            <span className="text-xs">{(signal.confidence * 100).toFixed(0)}% confidence</span>
          </div>
          {signal.profitLoss !== undefined && (
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1 opacity-70" />
              <span className={`text-xs ${signal.profitLoss >= 0 ? 'text-success-400' : 'text-error-400'}`}>
                {signal.profitLoss > 0 ? '+' : ''}{signal.profitLoss.toFixed(2)}%
              </span>
            </div>
          )}
        </div>
        
        <div className="text-xs opacity-80 border-t border-gray-700 pt-3 mt-3 line-clamp-2">
          {signal.explanation}
        </div>
      </div>
    </div>
  );
};

export default SignalCard;