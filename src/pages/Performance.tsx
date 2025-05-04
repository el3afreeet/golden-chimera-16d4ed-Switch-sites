import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import useModelStore from '../stores/modelStore';
import { TrendingUp, BarChart2, Percent, DollarSign, TrendingDown, Calendar } from 'lucide-react';

// Sample performance data - in a real app, this would come from an API
const performanceData = [
  { date: '2025-04-10', winRate: 0.61, profitFactor: 1.58, sharpeRatio: 1.32 },
  { date: '2025-04-11', winRate: 0.62, profitFactor: 1.61, sharpeRatio: 1.35 },
  { date: '2025-04-12', winRate: 0.64, profitFactor: 1.63, sharpeRatio: 1.39 },
  { date: '2025-04-13', winRate: 0.63, profitFactor: 1.62, sharpeRatio: 1.37 },
  { date: '2025-04-14', winRate: 0.65, profitFactor: 1.68, sharpeRatio: 1.40 },
  { date: '2025-04-15', winRate: 0.65, profitFactor: 1.72, sharpeRatio: 1.42 },
  { date: '2025-04-16', winRate: 0.67, profitFactor: 1.75, sharpeRatio: 1.45 },
  { date: '2025-04-17', winRate: 0.68, profitFactor: 1.78, sharpeRatio: 1.48 },
  { date: '2025-04-18', winRate: 0.66, profitFactor: 1.76, sharpeRatio: 1.44 },
  { date: '2025-04-19', winRate: 0.67, profitFactor: 1.79, sharpeRatio: 1.47 },
  { date: '2025-04-20', winRate: 0.69, profitFactor: 1.82, sharpeRatio: 1.51 },
  { date: '2025-04-21', winRate: 0.70, profitFactor: 1.85, sharpeRatio: 1.54 },
  { date: '2025-04-22', winRate: 0.69, profitFactor: 1.84, sharpeRatio: 1.52 },
  { date: '2025-04-23', winRate: 0.71, profitFactor: 1.89, sharpeRatio: 1.58 },
  { date: '2025-04-24', winRate: 0.72, profitFactor: 1.94, sharpeRatio: 1.63 },
  { date: '2025-04-25', winRate: 0.73, profitFactor: 1.97, sharpeRatio: 1.67 },
  { date: '2025-04-26', winRate: 0.72, profitFactor: 1.95, sharpeRatio: 1.65 },
  { date: '2025-04-27', winRate: 0.74, profitFactor: 1.99, sharpeRatio: 1.70 },
  { date: '2025-04-28', winRate: 0.72, profitFactor: 1.96, sharpeRatio: 1.66 },
  { date: '2025-04-29', winRate: 0.73, profitFactor: 1.98, sharpeRatio: 1.68 },
  { date: '2025-04-30', winRate: 0.75, profitFactor: 2.05, sharpeRatio: 1.75 },
  { date: '2025-05-01', winRate: 0.76, profitFactor: 2.08, sharpeRatio: 1.79 },
  { date: '2025-05-02', winRate: 0.76, profitFactor: 2.10, sharpeRatio: 1.82 },
];

const equityCurveData = [
  { date: '2025-04-10', equity: 10000 },
  { date: '2025-04-11', equity: 10120 },
  { date: '2025-04-12', equity: 10250 },
  { date: '2025-04-13', equity: 10180 },
  { date: '2025-04-14', equity: 10320 },
  { date: '2025-04-15', equity: 10480 },
  { date: '2025-04-16', equity: 10650 },
  { date: '2025-04-17', equity: 10820 },
  { date: '2025-04-18', equity: 10750 },
  { date: '2025-04-19', equity: 10890 },
  { date: '2025-04-20', equity: 11050 },
  { date: '2025-04-21', equity: 11220 },
  { date: '2025-04-22', equity: 11150 },
  { date: '2025-04-23', equity: 11320 },
  { date: '2025-04-24', equity: 11520 },
  { date: '2025-04-25', equity: 11680 },
  { date: '2025-04-26', equity: 11590 },
  { date: '2025-04-27', equity: 11780 },
  { date: '2025-04-28', equity: 11690 },
  { date: '2025-04-29', equity: 11820 },
  { date: '2025-04-30', equity: 12050 },
  { date: '2025-05-01', equity: 12230 },
  { date: '2025-05-02', equity: 12420 },
];

const tradeDistributionData = [
  { hour: '00:00', trades: 12, success: 7 },
  { hour: '02:00', trades: 8, success: 5 },
  { hour: '04:00', trades: 14, success: 10 },
  { hour: '06:00', trades: 22, success: 16 },
  { hour: '08:00', trades: 32, success: 25 },
  { hour: '10:00', trades: 28, success: 21 },
  { hour: '12:00', trades: 26, success: 18 },
  { hour: '14:00', trades: 35, success: 27 },
  { hour: '16:00', trades: 40, success: 32 },
  { hour: '18:00', trades: 33, success: 24 },
  { hour: '20:00', trades: 24, success: 17 },
  { hour: '22:00', trades: 18, success: 12 },
];

const pairPerformanceData = [
  { pair: 'EURUSD', winRate: 0.78, trades: 124, pips: 783 },
  { pair: 'GBPUSD', winRate: 0.72, trades: 98, pips: 652 },
  { pair: 'USDJPY', winRate: 0.75, trades: 86, pips: 712 },
  { pair: 'AUDUSD', winRate: 0.68, trades: 57, pips: 493 },
  { pair: 'USDCAD', winRate: 0.71, trades: 64, pips: 528 },
  { pair: 'EURGBP', winRate: 0.76, trades: 42, pips: 388 },
];

const Performance: React.FC = () => {
  const { t } = useTranslation();
  const { fetchModels, activeModel } = useModelStore();

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  if (!activeModel) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-6">{t('performance.title')}</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-dark-800 rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-2">
              <Percent className="h-5 w-5 text-primary-500 mr-2" />
              <h3 className="text-sm font-medium">{t('performance.winRate')}</h3>
            </div>
            <p className="text-2xl font-bold">{(activeModel.performance.winRate * 100).toFixed(1)}%</p>
            <div className="mt-2 text-xs text-success-400">
              +{(activeModel.performance.improvementFromPrevious * 100).toFixed(1)}% from prev
            </div>
          </div>
          
          <div className="bg-dark-800 rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-2">
              <TrendingUp className="h-5 w-5 text-primary-500 mr-2" />
              <h3 className="text-sm font-medium">{t('performance.profitFactor')}</h3>
            </div>
            <p className="text-2xl font-bold">{activeModel.performance.profitFactor.toFixed(2)}</p>
            <div className="mt-2 text-xs text-success-400">
              +0.25 from prev model
            </div>
          </div>
          
          <div className="bg-dark-800 rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-2">
              <BarChart2 className="h-5 w-5 text-primary-500 mr-2" />
              <h3 className="text-sm font-medium">{t('performance.sharpeRatio')}</h3>
            </div>
            <p className="text-2xl font-bold">{activeModel.performance.sharpeRatio.toFixed(2)}</p>
            <div className="mt-2 text-xs text-success-400">
              +0.39 from prev model
            </div>
          </div>
          
          <div className="bg-dark-800 rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-2">
              <TrendingDown className="h-5 w-5 text-primary-500 mr-2" />
              <h3 className="text-sm font-medium">{t('performance.maxDrawdown')}</h3>
            </div>
            <p className="text-2xl font-bold">{(activeModel.performance.maxDrawdown * 100).toFixed(1)}%</p>
            <div className="mt-2 text-xs text-success-400">
              -3.0% from prev model
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-dark-800 rounded-lg p-4 shadow-md mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Equity Curve</h2>
              <div className="flex space-x-2">
                <select className="px-2 py-1 rounded bg-dark-700 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500">
                  <option value="1m">1M</option>
                  <option value="3m">3M</option>
                  <option value="6m">6M</option>
                  <option value="ytd">YTD</option>
                  <option value="1y">1Y</option>
                </select>
              </div>
            </div>
            
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={equityCurveData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#94a3b8' }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  />
                  <YAxis 
                    tick={{ fill: '#94a3b8' }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Equity']}
                    labelFormatter={(label) => new Date(label).toLocaleDateString()}
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="equity" 
                    stroke="#0ea5e9" 
                    fillOpacity={1} 
                    fill="url(#equityGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-dark-800 rounded-lg p-4 shadow-md mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{t('performance.performanceOverTime')}</h2>
              <div className="flex space-x-2">
                <button className="px-2 py-1 rounded bg-primary-700 text-sm">Win Rate</button>
                <button className="px-2 py-1 rounded bg-dark-700 text-sm hover:bg-dark-600">Profit Factor</button>
                <button className="px-2 py-1 rounded bg-dark-700 text-sm hover:bg-dark-600">Sharpe Ratio</button>
              </div>
            </div>
            
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#94a3b8' }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  />
                  <YAxis 
                    tick={{ fill: '#94a3b8' }}
                    tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                    domain={[0.5, 0.8]}
                  />
                  <Tooltip 
                    formatter={(value) => [`${(value * 100).toFixed(1)}%`, 'Win Rate']}
                    labelFormatter={(label) => new Date(label).toLocaleDateString()}
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="winRate" 
                    stroke="#22c55e" 
                    strokeWidth={2} 
                    dot={{ r: 0 }}
                    activeDot={{ r: 6, fill: '#22c55e' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-dark-800 rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-4">
              <Calendar className="h-5 w-5 text-primary-500 mr-2" />
              <h2 className="text-xl font-semibold">Trade Distribution</h2>
            </div>
            
            <div className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tradeDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis 
                    dataKey="hour" 
                    tick={{ fill: '#94a3b8' }}
                  />
                  <YAxis 
                    tick={{ fill: '#94a3b8' }}
                  />
                  <Tooltip 
                    formatter={(value, name) => [value, name === 'trades' ? 'Total Trades' : 'Successful Trades']}
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="trades" 
                    stackId="1"
                    stroke="#0ea5e9" 
                    fill="#0ea5e9" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="success" 
                    stackId="2"
                    stroke="#22c55e" 
                    fill="#22c55e" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-dark-800 rounded-lg p-4 shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-4">Trade Statistics</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-dark-700 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-400 mb-1">{t('performance.totalTrades')}</p>
                <p className="text-xl font-bold">{activeModel.performance.totalTrades}</p>
              </div>
              <div className="bg-dark-700 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-400 mb-1">{t('performance.successfulTrades')}</p>
                <p className="text-xl font-bold">{activeModel.performance.successfulTrades}</p>
              </div>
              <div className="bg-dark-700 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-400 mb-1">{t('performance.failedTrades')}</p>
                <p className="text-xl font-bold">{activeModel.performance.failedTrades}</p>
              </div>
              <div className="bg-dark-700 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-400 mb-1">{t('performance.averageProfit')}</p>
                <p className="text-xl font-bold">{activeModel.performance.averageProfit.toFixed(2)}%</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-3">Evolution Threshold</h3>
              <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-500" 
                  style={{ width: '82%' }}
                ></div>
              </div>
              <div className="mt-1 flex justify-between text-xs">
                <span>Current: 82%</span>
                <span>Trigger: 90%</span>
              </div>
            </div>
            
            <div>
              <p className="text-xs text-gray-400 mb-2">
                The model will automatically trigger evolution when the 
                performance metrics decline below threshold or after 30 days 
                of stable operation.
              </p>
              <div className="text-xs flex items-center text-primary-400">
                <DollarSign className="h-3 w-3 mr-1" />
                <span>Expected next evolution: ~6 days</span>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-800 rounded-lg p-4 shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-4">Currency Pair Performance</h2>
            
            <div className="space-y-3">
              {pairPerformanceData.map(pair => (
                <div key={pair.pair} className="bg-dark-700 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{pair.pair}</span>
                    <span className="text-sm">{pair.trades} trades</span>
                  </div>
                  <div className="flex justify-between items-center mb-1 text-xs">
                    <span>Win Rate: {(pair.winRate * 100).toFixed(0)}%</span>
                    <span>{pair.pips} pips</span>
                  </div>
                  <div className="h-2 bg-dark-600 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-500" 
                      style={{ width: `${pair.winRate * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-dark-800 rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-4">Performance Anomalies</h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start border-l-2 border-warning-500 pl-3">
                <div className="flex-1">
                  <p className="font-medium text-warning-400">Unusual volatility detected</p>
                  <p className="text-xs mt-1 text-gray-400">
                    EURUSD showed 32% higher than normal volatility during London session.
                  </p>
                </div>
                <span className="text-xs text-gray-400">2d ago</span>
              </div>
              
              <div className="flex items-start border-l-2 border-error-500 pl-3">
                <div className="flex-1">
                  <p className="font-medium text-error-400">Consecutive losses detected</p>
                  <p className="text-xs mt-1 text-gray-400">
                    Detected 4 consecutive losses on USDJPY during news releases.
                  </p>
                </div>
                <span className="text-xs text-gray-400">4d ago</span>
              </div>
              
              <div className="flex items-start border-l-2 border-success-500 pl-3">
                <div className="flex-1">
                  <p className="font-medium text-success-400">Performance improvement</p>
                  <p className="text-xs mt-1 text-gray-400">
                    Win rate increased by 7% after last architectural adjustment.
                  </p>
                </div>
                <span className="text-xs text-gray-400">5d ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;