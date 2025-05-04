import React from 'react';
import { useTranslation } from 'react-i18next';
import { Brain, Zap, Trophy, TrendingUp, Gauge, LineChart } from 'lucide-react';
import { ModelArchitecture } from '../../types';

interface ModelInfoProps {
  model: ModelArchitecture;
}

const ModelInfo: React.FC<ModelInfoProps> = ({ model }) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg bg-dark-800 p-6 shadow-lg transition-all hover:shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Brain className="h-8 w-8 text-primary-500 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-white">
              {model.version}
            </h3>
            <p className="text-sm text-gray-400">
              {new Date(model.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        {model.isActive && (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-success-900 text-success-300 flex items-center">
            <Zap className="h-3 w-3 mr-1" />
            Active
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-dark-700 rounded-lg p-3">
          <div className="flex items-center mb-1">
            <Trophy className="h-4 w-4 text-success-500 mr-1" />
            <p className="text-xs text-gray-400">{t('performance.winRate')}</p>
          </div>
          <p className="text-xl font-bold">
            {(model.performance.winRate * 100).toFixed(1)}%
          </p>
        </div>
        <div className="bg-dark-700 rounded-lg p-3">
          <div className="flex items-center mb-1">
            <TrendingUp className="h-4 w-4 text-accent-500 mr-1" />
            <p className="text-xs text-gray-400">{t('performance.profitFactor')}</p>
          </div>
          <p className="text-xl font-bold">{model.performance.profitFactor.toFixed(2)}</p>
        </div>
        <div className="bg-dark-700 rounded-lg p-3">
          <div className="flex items-center mb-1">
            <Gauge className="h-4 w-4 text-warning-500 mr-1" />
            <p className="text-xs text-gray-400">{t('performance.sharpeRatio')}</p>
          </div>
          <p className="text-xl font-bold">{model.performance.sharpeRatio.toFixed(2)}</p>
        </div>
        <div className="bg-dark-700 rounded-lg p-3">
          <div className="flex items-center mb-1">
            <LineChart className="h-4 w-4 text-error-500 mr-1" />
            <p className="text-xs text-gray-400">{t('performance.maxDrawdown')}</p>
          </div>
          <p className="text-xl font-bold">
            {(model.performance.maxDrawdown * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-400 mb-2">Neural Network Architecture</h4>
        <div className="space-y-2">
          {model.layers.map((layer, index) => (
            <div key={index} className="flex items-center py-1 bg-dark-700 rounded-md px-3">
              <div className="w-16 text-xs text-gray-400">{layer.type}</div>
              <div className="flex-1 px-2">
                {layer.units && (
                  <div className="h-2 bg-primary-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-500 rounded-full" 
                      style={{ width: `${Math.min(100, (layer.units / 200) * 100)}%` }}
                    ></div>
                  </div>
                )}
                {layer.dropout && (
                  <div className="h-2 bg-dark-600 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent-500 rounded-full" 
                      style={{ width: `${layer.dropout * 100}%` }}
                    ></div>
                  </div>
                )}
              </div>
              <div className="w-16 text-right text-xs">
                {layer.units ? `${layer.units} units` : 
                 layer.dropout ? `${layer.dropout} rate` : ''}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-400 mb-2">Performance Improvement</h4>
        <div className="flex items-center">
          <div className="flex-1 h-2 bg-dark-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-success-500 rounded-full transition-all duration-1000" 
              style={{ width: `${Math.min(100, model.performance.improvementFromPrevious * 100 * 10)}%` }}
            ></div>
          </div>
          <span className="ml-2 text-sm font-medium text-success-400">
            +{(model.performance.improvementFromPrevious * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ModelInfo;