import { TextField } from "@mui/material";

export interface Field {
  field: string;
  id?: string;
}
export interface IInputProps {
  label?: string;
  field?: Field;
  children?: React.ReactNode;
}

export default function CustomInput({
  children,
  label,
  field,
  ...props
}: IInputProps) {
  return (
    <TextField
      {...field}
      {...props}
      label={label}
      size="small"
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
    >
      {children}
    </TextField>
  );
}