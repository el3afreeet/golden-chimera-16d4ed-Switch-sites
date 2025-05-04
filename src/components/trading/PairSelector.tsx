import React from 'react';
import { useTranslation } from 'react-i18next';
import { CurrencyPair } from '../../types';

interface PairSelectorProps {
  pairs: CurrencyPair[];
  activePair: string;
  onPairSelect: (pair: string) => void;
}

const PairSelector: React.FC<PairSelectorProps> = ({ pairs, activePair, onPairSelect }) => {
  const { t } = useTranslation();
  const [filter, setFilter] = React.useState<'all' | 'major' | 'minor' | 'exotic'>('all');

  const filteredPairs = pairs.filter(pair => 
    filter === 'all' ? true : pair.type === filter
  );

  return (
    <div className="bg-dark-800 rounded-lg p-4 shadow-md">
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-md text-sm ${
            filter === 'all' 
              ? 'bg-primary-600 text-white' 
              : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
          }`}
        >
          {t('common.allPairs')}
        </button>
        <button
          onClick={() => setFilter('major')}
          className={`px-3 py-1 rounded-md text-sm ${
            filter === 'major' 
              ? 'bg-primary-600 text-white' 
              : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
          }`}
        >
          {t('common.majorPairs')}
        </button>
        <button
          onClick={() => setFilter('minor')}
          className={`px-3 py-1 rounded-md text-sm ${
            filter === 'minor' 
              ? 'bg-primary-600 text-white' 
              : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
          }`}
        >
          {t('common.minorPairs')}
        </button>
        <button
          onClick={() => setFilter('exotic')}
          className={`px-3 py-1 rounded-md text-sm ${
            filter === 'exotic' 
              ? 'bg-primary-600 text-white' 
              : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
          }`}
        >
          {t('common.exoticPairs')}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {filteredPairs.map(pair => (
          <button
            key={pair.symbol}
            onClick={() => onPairSelect(pair.symbol)}
            className={`p-2 rounded-md text-sm transition-colors ${
              activePair === pair.symbol
                ? 'bg-primary-600 text-white'
                : 'bg-dark-700 hover:bg-dark-600 text-gray-300'
            }`}
          >
            <div className="font-medium">{pair.symbol}</div>
            <div className="text-xs opacity-75">
              {pair.base}/{pair.quote}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PairSelector;