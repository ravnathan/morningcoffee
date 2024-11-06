import React, { ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6f4e37',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#6f4e37',
            },
            '&:hover fieldset': {
              borderColor: '#6f4e37',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#6f4e37',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#6f4e37',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#6f4e37',
          },
        },
      },
    },
  },
});

interface AppWrapperProps {
  children: ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
