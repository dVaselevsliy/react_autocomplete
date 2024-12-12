import React from 'react';

interface Props {
  delay: number;
  setterDelay: (value: number) => void;
}

export const DelayButton: React.FC<Props> = React.memo(
  ({ delay, setterDelay }) => {
    return (
      <div>
        <label htmlFor="delaySettings">delaySettings</label>
        <input
          id="delaySettings"
          type="number"
          value={delay}
          onChange={event => setterDelay(+event.target.value)}
          min={100}
          max={5000}
          step={100}
        />
      </div>
    );
  },
);
