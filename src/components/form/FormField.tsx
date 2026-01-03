import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';

export const FormField: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      {...props}
      sx={{
        '& .MuiInputBase-root': {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        ...props.sx,
      }}
    />
  );
};