import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BaseSimulationParams, BaseSimulationResult } from '../../types/simulation';

interface SimulationState {
    params: BaseSimulationParams | null;
    results?: BaseSimulationResult | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: SimulationState = {
    params: null,
    results: null,
    status: 'idle',
}

export const simulationSlice = createSlice({
    name: 'simulation',
    initialState,
    reducers: {
        setParams: (state, action: PayloadAction<BaseSimulationParams>) => {
          state.params = action.payload
        },
        setResults: (state, action: PayloadAction<BaseSimulationResult>) => {
          state.results = action.payload
        },
        setStatus: (state, action: PayloadAction<SimulationState['status']>) => {
          state.status = action.payload
        },
    },
});

export const { setParams, setResults, setStatus } = simulationSlice.actions;

export default simulationSlice.reducer;