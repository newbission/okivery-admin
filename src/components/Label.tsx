import React from 'react';

type LabelProps = {
  label: string;
  element: React.ReactNode;
};

const Label = ({ label, element }: LabelProps) => {
  return (
    <label>
      {label}
      {element}
    </label>
  );
};

export default Label;
