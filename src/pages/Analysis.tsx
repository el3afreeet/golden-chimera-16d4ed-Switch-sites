import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ForexChart from '../components/charts/ForexChart';
import useTradingStore from '../stores/tradingStore';
import { TrendingUp, TrendingDown, BarChart2, Activity, Eye, Lock } from 'lucide-react';
import PairSelector from '../components/trading/PairSelector';

const Analysis: React.FC = () => {
  const { t } = useTranslation();
  const { 
    availablePairs, 
    activePair, 
    timeframe, 
    marketData, 
    setActivePair, 
    setTimeframe, 
    fetchMarketData,
    generateSignal
  } = useTradingStore();
  
  const [loading, setLoading] = useState(false);

  const timeframes = ['1D', '4H', '1H', '15M'];

  useEffect(() => {
    if (!marketData.length && activePair) {
      fetchMarketData(activePair, timeframe);
    }
  }, [fetchMarketData, activePair, timeframe, marketData.length]);

  const handleSignalGeneration = async () => {
    setLoading(true);
    await generateSignal();
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">{t('analysis.title')}</h1>
        
        <PairSelector
          pairs={availablePairs}
          activePair={activePair}
          onPairSelect={setActivePair}
        />
        
        <div className="flex flex-wrap gap-2 mt-4">
          <div className="flex rounded-md overflow-hidden">
            {timeframes.map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-2 ${
                  timeframe === tf 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
          
          <button
            onClick={handleSignalGeneration}
            disabled={loading}
            className="ml-auto px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-900 flex items-center disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="animate-spin h-4 w-4 mr-2 border-t-2 border-white rounded-full"></div>
                {t('analysis.processing')}
              </>
            ) : (
              t('analysis.generateSignal')
            )}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {marketData.length > 0 ? (
            <ForexChart 
              data={marketData} 
              pair={activePair} 
              timeframe={timeframe} 
            />
          ) : (
            <div className="h-[400px] flex items-center justify-center bg-dark-800 rounded-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          )}
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-dark-800 rounded-lg p-4 shadow-md">
              <h3 className="text-sm font-medium mb-3 flex items-center">
                <BarChart2 className="h-4 w-4 mr-2 text-primary-500" />
                {t('analysis.supportLevels')}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs">S1</span>
                  <span className="font-medium">1.0795</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs">S2</span>
                  <span className="font-medium">1.0750</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs">S3</span>
                  <span className="font-medium">1.0710</span>
                </div>
              </div>
            </div>
            
            <div className="bg-dark-800 rounded-lg p-4 shadow-md">
              <h3 className="text-sm font-medium mb-3 flex items-center">
                <Activity className="h-4 w-4 mr-2 text-primary-500" />
                {t('analysis.resistanceLevels')}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs">R1</span>
                  <span className="font-medium">1.0880</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs">R2</span>
                  <span className="font-medium">1.0930</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs">R3</span>
                  <span className="font-medium">1.0980</span>
                </div>
              </div>
            </div>
            
            <div className="bg-dark-800 rounded-lg p-4 shadow-md">
              <h3 className="text-sm font-medium mb-3 flex items-center">
                <Eye className="h-4 w-4 mr-2 text-primary-500" />
                {t('analysis.marketSentiment')}
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingDown className="h-4 w-4 text-error-500 mr-1" />
                  <span className="text-sm">Bearish</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-success-500 mr-1" />
                  <span className="text-sm">Bullish</span>
                </div>
              </div>
              <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-success-500" style={{ width: '65%' }}></div>
              </div>
              <div className="mt-2 text-xs text-right">65% Bullish</div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-dark-800 rounded-lg p-4 shadow-md mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{t('analysis.prediction')}</h3>
              <div className="px-2 py-1 bg-success-900 text-success-300 rounded-md text-xs font-medium">
                BUY
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">
                {t('analysis.confidence')}
              </label>
              <div className="h-3 bg-dark-700 rounded-full overflow-hidden">
                <div className="h-full bg-success-500" style={{ width: '78%' }}></div>
              </div>
              <div className="mt-1 text-xs text-right">78%</div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Entry</div>
                <div className="font-medium">1.0830</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Take Profit</div>
                <div className="font-medium text-success-400">1.0910</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Stop Loss</div>
                <div className="font-medium text-error-400">1.0790</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">{t('analysis.technicalSummary')}</h4>
              <div className="text-xs text-gray-300 space-y-2">
                <p>
                  Price is consolidating near key resistance with positive momentum indicators.
                  RSI shows bullish divergence while MACD signals potential upward movement.
                </p>
                <p>
                  Multiple timeframe analysis confirms bullish bias with higher lows 
                  forming on H4 and daily charts. Volume profile supports potential breakout.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-800 rounded-lg p-4 shadow-md mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{t('analysis.indicators')}</h3>
              <span className="text-xs text-success-400 font-medium">7 BUY • 2 SELL</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">RSI (14)</span>
                <span className="px-2 py-0.5 bg-success-900 text-success-300 rounded text-xs">BUY</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">MACD (12,26,9)</span>
                <span className="px-2 py-0.5 bg-success-900 text-success-300 rounded text-xs">BUY</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">MA (200)</span>
                <span className="px-2 py-0.5 bg-success-900 text-success-300 rounded text-xs">BUY</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Stochastic</span>
                <span className="px-2 py-0.5 bg-error-900 text-error-300 rounded text-xs">SELL</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Bollinger Bands</span>
                <span className="px-2 py-0.5 bg-success-900 text-success-300 rounded text-xs">BUY</span>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-800 rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-4">
              <Lock className="h-5 w-5 text-primary-500 mr-2" />
              <h3 className="text-lg font-semibold">Advanced Analysis</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Access advanced neural network analysis including deep pattern recognition,
              market correlation insights, and multi-timeframe predictions.
            </p>
            <button className="w-full py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
              Unlock Advanced Features
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;