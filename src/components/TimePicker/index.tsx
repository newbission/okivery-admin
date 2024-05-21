import React, { Dispatch, SetStateAction } from 'react';

interface TimePickerProps {
  time: string;
  setTime: Dispatch<SetStateAction<string>>;
}

const TimePicker: React.FC<TimePickerProps> = ({ time, setTime }) => {
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  return <input type='time' value={time} onChange={handleTimeChange} />;
};

export default React.memo(TimePicker);
