import { ReactNode } from 'react';

import {
  MenuItem as MuiMenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from '@mui/material';

export interface Option {
  value: string;
  label: string;
  id: number;
}

interface Props {
  options: Option[];
  isDisabled?: boolean;
  name?: string;
  value?: string;
  onChange: (event: SelectChangeEvent) => void;
  label: ReactNode | string;
  isError?: boolean | undefined;
}

// I use custom components over MUI just to have more control and adjust it for potential project needs
const Select = ({
  isError,
  label,
  options,
  value = '',
  name,
  onChange,
  isDisabled = false,
}: Props) => (
  <FormControl sx={{ width: '100%' }}>
    <InputLabel>{label}</InputLabel>
    <MuiSelect
      error={isError}
      label={label}
      name={name}
      onChange={onChange}
      fullWidth
      size="small"
      value={value}
      disabled={isDisabled}
    >
      <MuiMenuItem value="">None</MuiMenuItem>
      {options.map(({ value, label }, i) => (
        <MuiMenuItem key={i} value={value}>
          {label}
        </MuiMenuItem>
      ))}
    </MuiSelect>
  </FormControl>
);

export default Select;
