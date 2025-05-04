// Model types
export interface ModelArchitecture {
  id: string;
  version: string;
  layers: ModelLayer[];
  createdAt: string;
  performance: ModelPerformance;
  isActive: boolean;
}

export interface ModelLayer {
  type: string;
  units?: number;
  activation?: string;
  dropout?: number;
  kernelSize?: number[];
  filters?: number;
  poolSize?: number[];
  heads?: number;
  parameters: number;
}

export interface ModelPerformance {
  accuracy: number;
  sharpeRatio: number;
  maxDrawdown: number;
  winRate: number;
  profitFactor: number;
  totalTrades: number;
  successfulTrades: number;
  failedTrades: number;
  averageProfit: number;
  improvementFromPrevious: number;
}

// Trading types
export interface CurrencyPair {
  symbol: string;
  base: string;
  quote: string;
  pip: number;
  spread: number;
  type: 'major' | 'minor' | 'exotic';
}

export interface TradingSignal {
  id: string;
  pair: string;
  direction: 'buy' | 'sell';
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  timestamp: string;
  confidence: number;
  status: 'new' | 'active' | 'closed' | 'cancelled';
  profitLoss?: number;
  explanation: string;
  modelVersion: string;
}

export interface MarketData {
  pair: string;
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TimeSeriesPoint {
  time: string | number;
  value: number;
}

// Evolution types
export interface EvolutionEvent {
  id: string;
  timestamp: string;
  previousModelId: string;
  newModelId: string;
  performanceImprovement: number;
  architectureChanges: ArchitectureChange[];
  trigger: 'scheduled' | 'performance' | 'manual';
}

export interface ArchitectureChange {
  type: 'add' | 'remove' | 'modify';
  layerIndex?: number;
  description: string;
  impact: number;
}

// Application types
export interface UserSettings {
  language: 'en' | 'ar';
  theme: 'light' | 'dark';
  riskTolerance: number;
  defaultPairs: string[];
  notifications: boolean;
}

export interface BacktestConfig {
  period: {
    start: string;
    end: string;
  };
  pairs: string[];
  parameters: Record<string, number | boolean | string>;
}

export interface BacktestResult {
  id: string;
  config: BacktestConfig;
  performance: ModelPerformance;
  signals: TradingSignal[];
  timestamp: string;
}