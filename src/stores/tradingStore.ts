import { create } from 'zustand';
import { TradingSignal, CurrencyPair, MarketData } from '../types';

interface TradingState {
  signals: TradingSignal[];
  activePair: string;
  availablePairs: CurrencyPair[];
  marketData: MarketData[];
  timeframe: string;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchSignals: () => Promise<void>;
  fetchMarketData: (pair: string, timeframe: string) => Promise<void>;
  setActivePair: (pair: string) => void;
  setTimeframe: (timeframe: string) => void;
  generateSignal: () => Promise<void>;
}

// Mock data - in a real implementation, this would come from an API
const mockPairs: CurrencyPair[] = [
  // Major Pairs
  { symbol: 'EURUSD', base: 'EUR', quote: 'USD', pip: 0.0001, spread: 1.2, type: 'major' },
  { symbol: 'GBPUSD', base: 'GBP', quote: 'USD', pip: 0.0001, spread: 1.8, type: 'major' },
  { symbol: 'USDJPY', base: 'USD', quote: 'JPY', pip: 0.01, spread: 1.5, type: 'major' },
  { symbol: 'USDCHF', base: 'USD', quote: 'CHF', pip: 0.0001, spread: 2.0, type: 'major' },
  
  // Minor Pairs
  { symbol: 'EURGBP', base: 'EUR', quote: 'GBP', pip: 0.0001, spread: 1.3, type: 'minor' },
  { symbol: 'EURJPY', base: 'EUR', quote: 'JPY', pip: 0.01, spread: 1.6, type: 'minor' },
  { symbol: 'GBPJPY', base: 'GBP', quote: 'JPY', pip: 0.01, spread: 1.9, type: 'minor' },
  { symbol: 'CHFJPY', base: 'CHF', quote: 'JPY', pip: 0.01, spread: 2.1, type: 'minor' },
  
  // Exotic Pairs
  { symbol: 'EURTRY', base: 'EUR', quote: 'TRY', pip: 0.0001, spread: 25.0, type: 'exotic' },
  { symbol: 'USDZAR', base: 'USD', quote: 'ZAR', pip: 0.0001, spread: 15.0, type: 'exotic' },
  { symbol: 'USDMXN', base: 'USD', quote: 'MXN', pip: 0.0001, spread: 12.0, type: 'exotic' },
  { symbol: 'EURPLN', base: 'EUR', quote: 'PLN', pip: 0.0001, spread: 18.0, type: 'exotic' },
];

const mockSignals: TradingSignal[] = [
  {
    id: 'signal-001',
    pair: 'EURUSD',
    direction: 'buy',
    entryPrice: 1.0832,
    stopLoss: 1.0795,
    takeProfit: 1.0905,
    timestamp: '2025-05-12T08:24:13Z',
    confidence: 0.87,
    status: 'active',
    explanation: 'Price broke above key resistance level with strong momentum. RSI showing bullish divergence. Multiple timeframe analysis confirms uptrend.',
    modelVersion: '7.0.3',
  },
  {
    id: 'signal-002',
    pair: 'GBPUSD',
    direction: 'sell',
    entryPrice: 1.2654,
    stopLoss: 1.2692,
    takeProfit: 1.2578,
    timestamp: '2025-05-11T14:15:42Z',
    confidence: 0.79,
    status: 'closed',
    profitLoss: 0.65,
    explanation: 'Price reached overbought territory with bearish reversal pattern on H4. Strong resistance zone with historical significance. Multiple timeframe analysis shows bearish pressure.',
    modelVersion: '7.0.3',
  },
  {
    id: 'signal-003',
    pair: 'USDJPY',
    direction: 'buy',
    entryPrice: 154.28,
    stopLoss: 153.82,
    takeProfit: 155.20,
    timestamp: '2025-05-10T22:08:51Z',
    confidence: 0.82,
    status: 'active',
    explanation: 'Price consolidating after pullback to key support. Strong bullish engulfing pattern on daily chart. Market sentiment analysis shows increased risk appetite favoring JPY weakness.',
    modelVersion: '7.0.3',
  },
];

// Generate mock market data
const generateMockMarketData = (pair: string, days: number): MarketData[] => {
  const data: MarketData[] = [];
  const basePrice = pair === 'EURUSD' ? 1.08 : 
                   pair === 'GBPUSD' ? 1.26 : 
                   pair === 'USDJPY' ? 154.0 : 
                   pair === 'AUDUSD' ? 0.66 : 
                   pair === 'USDCAD' ? 1.36 : 1.15;
  
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Add some randomness to create realistic looking price movements
    const volatility = 0.002;
    const randomChange = (Math.random() - 0.5) * volatility * basePrice;
    const open = basePrice + randomChange + (Math.sin(i / 10) * 0.01 * basePrice);
    const high = open + (Math.random() * volatility * basePrice);
    const low = open - (Math.random() * volatility * basePrice);
    const close = (open + high + low + high + low) / 5; // Weighted towards high/low
    
    data.push({
      pair,
      timestamp: date.toISOString(),
      open,
      high,
      low,
      close,
      volume: Math.floor(Math.random() * 1000) + 500,
    });
  }
  
  return data;
};

const useTradingStore = create<TradingState>((set, get) => ({
  signals: [],
  activePair: 'EURUSD',
  availablePairs: [],
  marketData: [],
  timeframe: '1D',
  isLoading: false,
  error: null,

  fetchSignals: async () => {
    set({ isLoading: true, error: null });
    try {
      // In a real implementation, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set({ signals: mockSignals, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch signals', isLoading: false });
    }
  },

  fetchMarketData: async (pair: string, timeframe: string) => {
    set({ isLoading: true, error: null });
    try {
      // In a real implementation, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Generate some mock data for demonstration
      const days = timeframe === '1D' ? 30 : 
                  timeframe === '4H' ? 10 : 
                  timeframe === '1H' ? 5 : 2;
                  
      const data = generateMockMarketData(pair, days);
      
      set({ 
        marketData: data,
        activePair: pair,
        timeframe,
        availablePairs: mockPairs, // Setting available pairs on first load
        isLoading: false 
      });
    } catch (error) {
      set({ error: 'Failed to fetch market data', isLoading: false });
    }
  },

  setActivePair: (pair: string) => {
    set({ activePair: pair });
    get().fetchMarketData(pair, get().timeframe);
  },

  setTimeframe: (timeframe: string) => {
    set({ timeframe });
    get().fetchMarketData(get().activePair, timeframe);
  },

  generateSignal: async () => {
    set({ isLoading: true, error: null });
    try {
      // In a real implementation, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const { activePair, signals } = get();
      const pair = mockPairs.find(p => p.symbol === activePair);
      
      if (!pair) {
        throw new Error('Invalid pair');
      }
      
      // Get the latest price from market data (or use a default)
      const lastPrice = 
        get().marketData.length > 0 
          ? get().marketData[get().marketData.length - 1].close 
          : pair.symbol === 'EURUSD' ? 1.0845 : 
            pair.symbol === 'GBPUSD' ? 1.2672 : 
            pair.symbol === 'USDJPY' ? 154.32 : 
            pair.symbol === 'AUDUSD' ? 0.6645 : 
            pair.symbol === 'USDCAD' ? 1.3578 : 1.1423;
      
      // Randomly decide buy or sell
      const direction = Math.random() > 0.5 ? 'buy' : 'sell';
      
      // Calculate entry, stop loss and take profit based on direction
      const entryPrice = lastPrice;
      const pipSize = pair.pip;
      const stopPips = Math.floor(Math.random() * 30) + 20; // 20-50 pips
      const profitPips = Math.floor(Math.random() * 50) + 40; // 40-90 pips
      
      const stopLoss = direction === 'buy' 
        ? entryPrice - (stopPips * pipSize) 
        : entryPrice + (stopPips * pipSize);
        
      const takeProfit = direction === 'buy'
        ? entryPrice + (profitPips * pipSize)
        : entryPrice - (profitPips * pipSize);
      
      // Create a new signal
      const newSignal: TradingSignal = {
        id: `signal-${Date.now()}`,
        pair: activePair,
        direction,
        entryPrice,
        stopLoss: Number(stopLoss.toFixed(5)),
        takeProfit: Number(takeProfit.toFixed(5)),
        timestamp: new Date().toISOString(),
        confidence: (Math.random() * 0.2) + 0.7, // 0.7-0.9
        status: 'new',
        explanation: direction === 'buy'
          ? 'Bullish engulfing pattern detected with confluence of multiple technical indicators. Strong support level holding with decreasing selling pressure. Momentum indicators show potential for continued upward movement.'
          : 'Bearish divergence detected on RSI with price reaching key resistance zone. Supply zone analysis shows strong selling pressure. Multiple timeframe analysis confirms potential reversal.',
        modelVersion: '7.0.3',
      };
      
      set({ 
        signals: [newSignal, ...signals],
        isLoading: false 
      });
    } catch (error) {
      set({ error: 'Failed to generate signal', isLoading: false });
    }
  },
}));

export default useTradingStore;