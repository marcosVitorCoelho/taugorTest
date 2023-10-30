import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export interface Field {
  field: string;
  id?: string;
}
export interface IInputProps {
  label?: string;
  field?: Field;
}

export default function DateInput({
  label,
  field,
  ...props
}: IInputProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...props}
        label={label}
        value={field!.value}
        onChange={field!.onChange}
      />
    </LocalizationProvider>
  );
}