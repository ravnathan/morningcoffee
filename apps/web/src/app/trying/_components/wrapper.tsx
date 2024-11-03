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

// Define the props for AppWrapper
interface AppWrapperProps {
  children: ReactNode; // Explicitly typing children
}

// Create a wrapper component
const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppWrapper;
