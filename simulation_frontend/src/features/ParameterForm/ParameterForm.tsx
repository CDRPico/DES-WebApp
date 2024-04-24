import React, { useState } from 'react';
import { BaseSimulationParams } from '../../types/simulation';

interface Props {
  initialParams: BaseSimulationParams;
  onSubmit: (parameters: BaseSimulationParams) => void;
}

const ParameterForm: React.FC<Props> = ({ initialParams, onSubmit }) => {
  const [params, setParams] = useState<BaseSimulationParams>(initialParams);

  const handleChange = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setParams(prevParams => ({ ...prevParams, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(params);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(initialParams).map((key) => (
        <div key={key}>
          <label>
            {key}:
            <input
              type="text"
              value={params[key]}
              onChange={(e) => handleChange(key, e)}
            />
          </label>
        </div>
      ))}
      <button type="submit">Update Parameters</button>
    </form>
  );
};

export default ParameterForm;
