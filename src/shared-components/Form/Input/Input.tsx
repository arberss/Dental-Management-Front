import { Styles, Sx, TextInput, TextInputStylesNames } from '@mantine/core';
import React from 'react';

interface InputProps {
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  icon?: string;
  error?: string;
  space?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: any;
  defaultValue?: string;
  type?: string;
  sx?: Sx;
  styles?: Styles<TextInputStylesNames, Record<string, any>>;
}

const Input = (props: InputProps) => {
  const {
    name,
    label,
    description,
    placeholder,
    icon,
    error,
    onChange,
    value,
    type = 'text',
    defaultValue,
    sx,
    styles,
  } = props;

  return (
    <TextInput
      name={name}
      label={label}
      description={description}
      placeholder={placeholder}
      icon={icon}
      error={error}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      type={type}
      sx={sx}
      styles={styles}
    />
  );
};

export default Input;
