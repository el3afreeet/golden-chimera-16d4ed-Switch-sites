import { afterEach, describe, expect, it, vi } from 'vitest';
import useTradingStore from './tradingStore';

const initialState = useTradingStore.getState();

afterEach(() => {
  vi.useRealTimers();
  useTradingStore.setState(initialState, true);
});

describe('trading store market data requests', () => {
  it('keeps the latest request when responses resolve out of order', async () => {
    vi.useFakeTimers();

    const firstRequest = useTradingStore.getState().fetchMarketData('EURUSD', '1D');
    await vi.advanceTimersByTimeAsync(100);
    const secondRequest = useTradingStore.getState().fetchMarketData('GBPUSD', '4H');

    await vi.advanceTimersByTimeAsync(500);
    await firstRequest;
    await vi.advanceTimersByTimeAsync(100);
    await secondRequest;

    const state = useTradingStore.getState();
    expect(state.activePair).toBe('GBPUSD');
    expect(state.timeframe).toBe('4H');
    expect(state.marketData).toHaveLength(11);
    expect(state.isLoading).toBe(false);
  });
});
