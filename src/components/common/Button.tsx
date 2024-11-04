import { ReactNode } from 'react';
import { Button as MuiButton } from '@mui/material';
import { ButtonOwnProps } from '@mui/material/Button/Button';

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  label: ReactNode | string;
  isDisabled?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
  color?: ButtonOwnProps['color'];
}

const Button = ({
  onClick,
  label,
  isDisabled,
  variant = 'contained',
  color = 'primary',
}: Props) => (
  <MuiButton
    onClick={onClick}
    disabled={isDisabled}
    variant={variant}
    color={color}
  >
    {label}
  </MuiButton>
);

export default Button;
