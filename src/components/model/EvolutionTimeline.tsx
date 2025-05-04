import React from 'react';
import { useTranslation } from 'react-i18next';
import { EvolutionEvent } from '../../types';
import { ArrowUp, Clock, Zap, Brain } from 'lucide-react';

interface EvolutionTimelineProps {
  events: EvolutionEvent[];
}

const EvolutionTimeline: React.FC<EvolutionTimelineProps> = ({ events }) => {
  const { t } = useTranslation();

  const getTriggerIcon = (trigger: string) => {
    switch (trigger) {
      case 'scheduled':
        return <Clock className="h-4 w-4 text-primary-400" />;
      case 'performance':
        return <Zap className="h-4 w-4 text-warning-400" />;
      case 'manual':
        return <Brain className="h-4 w-4 text-accent-400" />;
      default:
        return <Brain className="h-4 w-4 text-primary-400" />;
    }
  };

  if (!events.length) {
    return <div className="text-center py-8 text-gray-500">No evolution events yet</div>;
  }

  return (
    <div className="relative pl-8 space-y-8">
      {/* Vertical line */}
      <div className="absolute left-3 top-2 bottom-0 w-0.5 bg-dark-700" />

      {events.map((event, index) => (
        <div key={event.id} className="relative">
          {/* Circle indicator */}
          <div className="absolute -left-8 mt-1.5 w-6 h-6 rounded-full flex items-center justify-center bg-dark-800 border-2 border-primary-500">
            {getTriggerIcon(event.trigger)}
          </div>

          <div className="bg-dark-800 rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="text-sm font-medium">
                  Evolution {event.newModelId.split('-').pop()}
                </span>
                <span className="ml-2 text-xs text-gray-400">
                  {new Date(event.timestamp).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center text-success-400 text-sm">
                <ArrowUp className="h-3 w-3 mr-1" />
                +{(event.performanceImprovement * 100).toFixed(1)}%
              </div>
            </div>

            <div className="space-y-2 mb-3">
              {event.architectureChanges.map((change, i) => (
                <div 
                  key={i}
                  className={`text-xs px-2 py-1 rounded-md ${
                    change.type === 'add' ? 'bg-success-900 text-success-300' : 
                    change.type === 'remove' ? 'bg-error-900 text-error-300' : 
                    'bg-primary-900 text-primary-300'
                  }`}
                >
                  {change.description}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <div>
                <span>From: </span>
                <span className="text-primary-400">{event.previousModelId.split('-').pop()}</span>
              </div>
              <div>
                <span>To: </span>
                <span className="text-primary-400">{event.newModelId.split('-').pop()}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EvolutionTimeline;