import React from 'react';

interface Props {
    onStart: () => void;
    onStop: () => void;
    onPause?: () => void;
    onResume?: () => void;
}

const SimulationControl: React.FC<Props> = ({ onStart, onStop, onPause, onResume }) => (
    <div>
        <button onClick={onStart}>Start Simulation</button>
        <button onClick={onStop}>Stop Simulation</button>
        {onPause && <button onClick={onPause}>Pause Simulation</button>}
        {onResume && <button onClick={onResume}>Resume Simulation</button>}
    </div>
);
  
export default SimulationControl;