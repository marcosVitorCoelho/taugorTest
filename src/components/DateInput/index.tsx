import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
export interface Field {
  field: string;
  id?: string;
}
export interface IInputProps {
  label?: string;
  field?: Field;
  onChange?: () => void;
  helperText?: string;
  value?: Date;
}

export default function DateInput({
  label,
  field,
  ...props
}: IInputProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        format='DD/MM/YYYY'
        slotProps={{ textField: { size: 'small' } }}
        {...props}
        label={label}
      />
    </LocalizationProvider>
  );
}