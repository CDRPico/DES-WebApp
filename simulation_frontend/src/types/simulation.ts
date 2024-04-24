export type GenericObject = Record<string, any>;

export interface BaseSimulationParams {
    [key: string]: any;  // Flexible key-value pairs
}

export interface BaseSimulationResult {
    [key: string]: any;  // Results can be numeric, textual, arrays, etc.
}

export interface Simulation {
    id: string;
    name: string;
    description: string;
    params: BaseSimulationParams;
    results?: BaseSimulationResult;
}
