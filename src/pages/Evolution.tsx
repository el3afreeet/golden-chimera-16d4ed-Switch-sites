import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useModelStore from '../stores/modelStore';
import ModelInfo from '../components/model/ModelInfo';
import EvolutionTimeline from '../components/model/EvolutionTimeline';
import { Brain, Cpu, RefreshCw, AlertTriangle } from 'lucide-react';

const Evolution: React.FC = () => {
  const { t } = useTranslation();
  const { 
    fetchModels, 
    activeModel, 
    models,
    evolutionHistory,
    fetchEvolutionHistory,
    triggerEvolution,
    isEvolutionInProgress,
    evolutionProgress
  } = useModelStore();
  
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    fetchModels();
    fetchEvolutionHistory();
  }, [fetchModels, fetchEvolutionHistory]);

  const handleTriggerEvolution = () => {
    setShowConfirm(true);
  };

  const confirmEvolution = async () => {
    setShowConfirm(false);
    await triggerEvolution();
  };

  const cancelEvolution = () => {
    setShowConfirm(false);
  };

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
        <h1 className="text-2xl font-bold mb-4">{t('evolution.title')}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {isEvolutionInProgress ? (
              <div className="bg-dark-800 rounded-lg p-6 shadow-md mb-6">
                <div className="flex items-center mb-6">
                  <div className="animate-pulse mr-3">
                    <Brain className="h-8 w-8 text-primary-500" />
                  </div>
                  <h2 className="text-xl font-semibold">{t('evolution.evolutionProgress')}</h2>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{evolutionProgress}%</span>
                  </div>
                  <div className="h-3 bg-dark-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-500 rounded-full transition-all duration-500" 
                      style={{ width: `${evolutionProgress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-dark-700 p-3 rounded-lg">
                      <p className="text-xs text-gray-400 mb-1">Current Phase</p>
                      <p className="font-medium">Genetic Optimization</p>
                    </div>
                    <div className="bg-dark-700 p-3 rounded-lg">
                      <p className="text-xs text-gray-400 mb-1">Time Remaining</p>
                      <p className="font-medium">~3 minutes</p>
                    </div>
                  </div>
                  
                  <div className="bg-dark-700 p-3 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Status Updates</p>
                    <div className="space-y-1 text-sm">
                      <p>• Testing layer modifications</p>
                      <p>• Evaluating new architectures</p>
                      <p>• Applying reinforcement feedback</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-dark-800 rounded-lg p-6 shadow-md mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Brain className="h-8 w-8 text-primary-500 mr-3" />
                    <h2 className="text-xl font-semibold">{t('evolution.currentGeneration')}</h2>
                  </div>
                  <button
                    onClick={handleTriggerEvolution}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-900"
                  >
                    {t('evolution.triggerEvolution')}
                  </button>
                </div>
                
                <ModelInfo model={activeModel} />
              </div>
            )}
            
            <div className="bg-dark-800 rounded-lg p-6 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">{t('evolution.evolutionHistory')}</h2>
                <button className="flex items-center text-sm text-primary-400 hover:text-primary-300">
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Refresh
                </button>
              </div>
              
              <EvolutionTimeline events={evolutionHistory} />
            </div>
          </div>
          
          <div>
            <div className="bg-dark-800 rounded-lg p-4 shadow-md mb-6">
              <h2 className="text-lg font-semibold mb-4">{t('evolution.improvementMetrics')}</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Win Rate</span>
                    <span>+23%</span>
                  </div>
                  <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                    <div className="h-full bg-success-500" style={{ width: '23%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Sharpe Ratio</span>
                    <span>+45%</span>
                  </div>
                  <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                    <div className="h-full bg-success-500" style={{ width: '45%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Max Drawdown</span>
                    <span>-18%</span>
                  </div>
                  <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                    <div className="h-full bg-success-500" style={{ width: '18%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Profit Factor</span>
                    <span>+31%</span>
                  </div>
                  <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                    <div className="h-full bg-success-500" style={{ width: '31%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-dark-800 rounded-lg p-4 shadow-md mb-6">
              <h2 className="text-lg font-semibold mb-4">{t('evolution.architectureChanges')}</h2>
              
              <div className="space-y-3 text-sm">
                <div className="p-2 rounded-md bg-success-900 bg-opacity-20 border border-success-800">
                  <p className="font-medium text-success-400">LSTM Units Increased</p>
                  <p className="text-xs mt-1">Increased first layer units from 64 to 128, improving long-term pattern recognition.</p>
                </div>
                
                <div className="p-2 rounded-md bg-error-900 bg-opacity-20 border border-error-800">
                  <p className="font-medium text-error-400">Dropout Rate Decreased</p>
                  <p className="text-xs mt-1">Reduced dropout from 0.3 to 0.2 after finding optimal regularization balance.</p>
                </div>
                
                <div className="p-2 rounded-md bg-primary-900 bg-opacity-20 border border-primary-800">
                  <p className="font-medium text-primary-400">Hidden Layer Added</p>
                  <p className="text-xs mt-1">Introduced additional dense layer with 32 units for better feature extraction.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-dark-800 rounded-lg p-4 shadow-md">
              <h2 className="text-lg font-semibold mb-4">{t('evolution.generationComparison')}</h2>
              
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400">
                    <th className="pb-2">Model</th>
                    <th className="pb-2">Win Rate</th>
                    <th className="pb-2">Profit Factor</th>
                  </tr>
                </thead>
                <tbody>
                  {models.slice(0, 4).map((model, index) => (
                    <tr key={model.id} className="border-t border-dark-700">
                      <td className="py-2 flex items-center">
                        <Cpu className="h-3 w-3 mr-1 text-primary-400" />
                        <span>{model.version}</span>
                      </td>
                      <td className="py-2">{(model.performance.winRate * 100).toFixed(1)}%</td>
                      <td className="py-2">{model.performance.profitFactor.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dark-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-warning-500 mr-2" />
              <h3 className="text-lg font-semibold">Confirm Evolution</h3>
            </div>
            
            <p className="mb-6 text-gray-300">
              Triggering an evolution will create a new model generation. This process will take several minutes
              and cannot be interrupted. The AI will attempt to improve its architecture and performance.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelEvolution}
                className="px-4 py-2 bg-dark-700 text-white rounded-md hover:bg-dark-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmEvolution}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Evolution;