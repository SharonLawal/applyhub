import { TextField, Zoom, Box, Typography } from '@mui/material';
import type { TextFieldProps } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const FormField: React.FC<TextFieldProps> = (props) => {
  const { error, helperText, ...other } = props;

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <TextField
        {...other}
        error={error}
        helperText={null} 
        sx={{
          '& .MuiOutlinedInput-root': {
            transition: 'all 0.2s',
            '&.Mui-error': {
              backgroundColor: (theme) => 
                theme.palette.mode === 'light' ? '#fff5f5' : 'rgba(239, 68, 68, 0.1)',
            }
          },
          ...props.sx,
        }}
      />
      
      <Box sx={{ minHeight: '24px', mt: 0.5 }}>
        {error ? (
          <Zoom in={Boolean(error)}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'error.main' }}>
              <ErrorOutlineIcon sx={{ fontSize: 16 }} />
              <Typography variant="caption" fontWeight={600}>
                {helperText}
              </Typography>
            </Box>
          </Zoom>
        ) : (
          helperText && (
            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
              {helperText}
            </Typography>
          )
        )}
      </Box>
    </Box>
  );
};