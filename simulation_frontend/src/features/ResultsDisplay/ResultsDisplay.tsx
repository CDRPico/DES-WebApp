
import React from 'react';
import { BaseSimulationResult } from '../../types/simulation';

interface Props {
  results: BaseSimulationResult;
}

const ResultsDisplay: React.FC<Props> = ({ results }) => (
  <div>
    <h3>Simulation Results</h3>
    <ul>
      {Object.entries(results).map(([key, value]) => (
        <li key={key}>{`${key}: ${value}`}</li>
      ))}
    </ul>
  </div>
);

export default ResultsDisplay;