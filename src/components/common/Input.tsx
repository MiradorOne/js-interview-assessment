import { ReactNode } from 'react';
import { TextField as MuiTextField } from '@mui/material';

interface Props {
  width?: string | number;
  isDisabled?: boolean;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  label: ReactNode | string;
  isError?: boolean;
  placeholder?: string;
  type?: string;
}

const Input = ({
  isError,
  label,
  value,
  onChange,
  isDisabled,
  placeholder,
  type = 'text',
}: Props) => (
  <MuiTextField
    error={isError}
    label={label}
    onChange={onChange}
    value={value}
    disabled={isDisabled}
    size="small"
    placeholder={placeholder}
    type={type}
  />
);

export default Input;
