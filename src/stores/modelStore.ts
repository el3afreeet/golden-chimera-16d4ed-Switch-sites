import { create } from 'zustand';
import { ModelArchitecture, EvolutionEvent } from '../types';

interface ModelState {
  models: ModelArchitecture[];
  activeModel: ModelArchitecture | null;
  evolutionHistory: EvolutionEvent[];
  isEvolutionInProgress: boolean;
  evolutionProgress: number;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchModels: () => Promise<void>;
  setActiveModel: (modelId: string) => void;
  triggerEvolution: () => Promise<void>;
  fetchEvolutionHistory: () => Promise<void>;
}

// Mock data - in a real implementation, this would come from an API
const mockModels: ModelArchitecture[] = [
  {
    id: 'model-gen-7',
    version: '7.0.3',
    layers: [
      { type: 'LSTM', units: 128, activation: 'tanh', parameters: 66560 },
      { type: 'Dropout', dropout: 0.2, parameters: 0 },
      { type: 'LSTM', units: 64, activation: 'tanh', parameters: 49664 },
      { type: 'Dropout', dropout: 0.1, parameters: 0 },
      { type: 'Dense', units: 32, activation: 'relu', parameters: 2080 },
      { type: 'Dense', units: 3, activation: 'softmax', parameters: 99 },
    ],
    createdAt: '2025-05-02T14:23:15Z',
    performance: {
      accuracy: 0.76,
      sharpeRatio: 1.82,
      maxDrawdown: 0.09,
      winRate: 0.72,
      profitFactor: 2.1,
      totalTrades: 358,
      successfulTrades: 258,
      failedTrades: 100,
      averageProfit: 0.65,
      improvementFromPrevious: 0.08,
    },
    isActive: true,
  },
  {
    id: 'model-gen-6',
    version: '6.2.7',
    layers: [
      { type: 'LSTM', units: 96, activation: 'tanh', parameters: 45056 },
      { type: 'Dropout', dropout: 0.3, parameters: 0 },
      { type: 'LSTM', units: 48, activation: 'tanh', parameters: 27840 },
      { type: 'Dense', units: 16, activation: 'relu', parameters: 784 },
      { type: 'Dense', units: 3, activation: 'softmax', parameters: 51 },
    ],
    createdAt: '2025-04-15T09:12:47Z',
    performance: {
      accuracy: 0.68,
      sharpeRatio: 1.43,
      maxDrawdown: 0.12,
      winRate: 0.65,
      profitFactor: 1.85,
      totalTrades: 412,
      successfulTrades: 268,
      failedTrades: 144,
      averageProfit: 0.52,
      improvementFromPrevious: 0.05,
    },
    isActive: false,
  },
];

const mockEvolutionHistory: EvolutionEvent[] = [
  {
    id: 'evolution-7',
    timestamp: '2025-05-02T14:23:15Z',
    previousModelId: 'model-gen-6',
    newModelId: 'model-gen-7',
    performanceImprovement: 0.08,
    architectureChanges: [
      { type: 'modify', layerIndex: 0, description: 'Increased LSTM units from 96 to 128', impact: 0.04 },
      { type: 'add', layerIndex: 4, description: 'Added additional Dense layer', impact: 0.02 },
      { type: 'modify', layerIndex: 1, description: 'Reduced dropout from 0.3 to 0.2', impact: 0.02 },
    ],
    trigger: 'performance',
  },
  {
    id: 'evolution-6',
    timestamp: '2025-04-15T09:12:47Z',
    previousModelId: 'model-gen-5',
    newModelId: 'model-gen-6',
    performanceImprovement: 0.05,
    architectureChanges: [
      { type: 'remove', layerIndex: 3, description: 'Removed one Dense layer', impact: 0.01 },
      { type: 'modify', layerIndex: 0, description: 'Increased LSTM units from 64 to 96', impact: 0.03 },
      { type: 'modify', layerIndex: 1, description: 'Increased dropout from 0.2 to 0.3', impact: 0.01 },
    ],
    trigger: 'scheduled',
  },
];

const useModelStore = create<ModelState>((set, get) => ({
  models: [],
  activeModel: null,
  evolutionHistory: [],
  isEvolutionInProgress: false,
  evolutionProgress: 0,
  isLoading: false,
  error: null,

  fetchModels: async () => {
    set({ isLoading: true, error: null });
    try {
      // In a real implementation, this would be an API call
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set({ 
        models: mockModels,
        activeModel: mockModels.find(model => model.isActive) || mockModels[0],
        isLoading: false 
      });
    } catch (error) {
      set({ error: 'Failed to fetch models', isLoading: false });
    }
  },

  setActiveModel: (modelId: string) => {
    const { models } = get();
    const newActiveModel = models.find(model => model.id === modelId);
    
    if (newActiveModel) {
      set({ 
        models: models.map(model => ({
          ...model,
          isActive: model.id === modelId
        })),
        activeModel: newActiveModel 
      });
    }
  },

  triggerEvolution: async () => {
    set({ 
      isEvolutionInProgress: true,
      evolutionProgress: 0,
      error: null 
    });

    try {
      // Simulate evolution process
      for (let i = 0; i <= 10; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));
        set({ evolutionProgress: i * 10 });
      }

      // In a real implementation, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate a new model being created
      const newModel: ModelArchitecture = {
        id: 'model-gen-8',
        version: '8.0.1',
        layers: [
          { type: 'LSTM', units: 160, activation: 'tanh', parameters: 103680 },
          { type: 'Dropout', dropout: 0.15, parameters: 0 },
          { type: 'LSTM', units: 80, activation: 'tanh', parameters: 77120 },
          { type: 'Dropout', dropout: 0.1, parameters: 0 },
          { type: 'Dense', units: 40, activation: 'relu', parameters: 3240 },
          { type: 'Dense', units: 16, activation: 'relu', parameters: 656 },
          { type: 'Dense', units: 3, activation: 'softmax', parameters: 51 },
        ],
        createdAt: new Date().toISOString(),
        performance: {
          accuracy: 0.81,
          sharpeRatio: 2.04,
          maxDrawdown: 0.08,
          winRate: 0.78,
          profitFactor: 2.35,
          totalTrades: 275,
          successfulTrades: 214,
          failedTrades: 61,
          averageProfit: 0.72,
          improvementFromPrevious: 0.05,
        },
        isActive: true,
      };

      const newEvolution: EvolutionEvent = {
        id: 'evolution-8',
        timestamp: new Date().toISOString(),
        previousModelId: 'model-gen-7',
        newModelId: 'model-gen-8',
        performanceImprovement: 0.05,
        architectureChanges: [
          { type: 'modify', layerIndex: 0, description: 'Increased LSTM units from 128 to 160', impact: 0.02 },
          { type: 'add', layerIndex: 5, description: 'Added additional Dense layer', impact: 0.01 },
          { type: 'modify', layerIndex: 1, description: 'Reduced dropout from 0.2 to 0.15', impact: 0.01 },
          { type: 'modify', layerIndex: 2, description: 'Increased LSTM units from 64 to 80', impact: 0.01 },
        ],
        trigger: 'manual',
      };

      const { models, evolutionHistory } = get();
      const updatedModels = models.map(model => ({
        ...model,
        isActive: false
      }));
      updatedModels.unshift(newModel);

      set({
        models: updatedModels,
        activeModel: newModel,
        evolutionHistory: [newEvolution, ...evolutionHistory],
        isEvolutionInProgress: false,
        evolutionProgress: 100,
      });
    } catch (error) {
      set({ 
        error: 'Evolution process failed', 
        isEvolutionInProgress: false 
      });
    }
  },

  fetchEvolutionHistory: async () => {
    set({ isLoading: true, error: null });
    try {
      // In a real implementation, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 600));
      
      set({ 
        evolutionHistory: mockEvolutionHistory,
        isLoading: false 
      });
    } catch (error) {
      set({ error: 'Failed to fetch evolution history', isLoading: false });
    }
  },
}));

export default useModelStore;