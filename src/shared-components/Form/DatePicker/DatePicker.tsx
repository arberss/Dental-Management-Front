import { DatePicker as MantineDatePicker } from '@mantine/dates';

interface DatePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
  clearable?: boolean;
  onChange: (value: Date) => void;
  value: Date | null | undefined;
  selectType?: 'month' | 'date' | 'year';
  allowLevelChange?: boolean;
  defaultValue?: Date | null;
  error?: string;
}

const DatePicker = ({
  name,
  label,
  placeholder,
  clearable = false,
  onChange,
  value,
  selectType = 'date',
  allowLevelChange,
  defaultValue,
  error,
}: DatePickerProps) => {
  return (
    <MantineDatePicker
      name={name}
      label={label}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      clearable={clearable}
      inputFormat='DD MMMM YYYY'
      initialLevel={selectType}
      allowLevelChange={allowLevelChange}
      defaultValue={defaultValue}
      error={error}
    />
  );
};

export default DatePicker;
