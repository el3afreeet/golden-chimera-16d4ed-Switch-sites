import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi, LineStyle, CandlestickData } from 'lightweight-charts';
import { MarketData } from '../../types';
import useUIStore from '../../stores/uiStore';

interface ForexChartProps {
  data: MarketData[];
  pair: string;
  timeframe: string;
}

const ForexChart: React.FC<ForexChartProps> = ({ data, pair, timeframe }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const { theme } = useUIStore();

  // Convert market data to chart format
  const chartData: CandlestickData[] = data.map(item => ({
    time: new Date(item.timestamp).getTime() / 1000,
    open: item.open,
    high: item.high,
    low: item.low,
    close: item.close,
  }));

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current?.clientWidth || 600,
        });
      }
    };

    // Chart configuration
    const isDarkTheme = theme === 'dark';
    const chartOptions = {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { type: ColorType.Solid, color: isDarkTheme ? '#111827' : '#ffffff' },
        textColor: isDarkTheme ? '#d1d5db' : '#374151',
      },
      grid: {
        vertLines: {
          color: isDarkTheme ? '#1f2937' : '#f3f4f6',
          style: LineStyle.Dotted,
        },
        horzLines: {
          color: isDarkTheme ? '#1f2937' : '#f3f4f6',
          style: LineStyle.Dotted,
        },
      },
      crosshair: {
        mode: 0,
        vertLine: {
          color: isDarkTheme ? '#4f46e5' : '#6366f1',
          width: 1,
          style: LineStyle.Solid,
          labelBackgroundColor: isDarkTheme ? '#4f46e5' : '#6366f1',
        },
        horzLine: {
          color: isDarkTheme ? '#4f46e5' : '#6366f1',
          width: 1,
          style: LineStyle.Solid,
          labelBackgroundColor: isDarkTheme ? '#4f46e5' : '#6366f1',
        },
      },
      timeScale: {
        borderColor: isDarkTheme ? '#374151' : '#e5e7eb',
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderColor: isDarkTheme ? '#374151' : '#e5e7eb',
      },
      watermark: {
        color: isDarkTheme ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
        visible: true,
        text: pair,
        fontSize: 60,
        horzAlign: 'center',
        vertAlign: 'center',
      },
    };

    // Create and set up chart
    chartRef.current = createChart(chartContainerRef.current, chartOptions);
    seriesRef.current = chartRef.current.addCandlestickSeries({
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderUpColor: '#16a34a',
      borderDownColor: '#dc2626',
      wickUpColor: '#16a34a',
      wickDownColor: '#dc2626',
    });

    // Add data to chart
    seriesRef.current.setData(chartData);

    // Make chart responsive
    window.addEventListener('resize', handleResize);

    // Clean up on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [theme, chartContainerRef, data.length]);

  // Update data when it changes
  useEffect(() => {
    if (seriesRef.current && chartData.length > 0) {
      seriesRef.current.setData(chartData);
    }
  }, [data]);

  return (
    <div className="mt-2 rounded-md overflow-hidden bg-opacity-50 backdrop-blur">
      <div className="p-2 flex justify-between items-center">
        <div className="font-semibold">
          {pair} • {timeframe}
        </div>
      </div>
      <div ref={chartContainerRef} className="w-full h-[400px] relative" />
    </div>
  );
};

export default ForexChart;