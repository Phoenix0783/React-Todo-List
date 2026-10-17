import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useState } from 'react';

import { AppState } from '../providers/AppState.jsx';
import { AllTodoLists } from './AllTodoLists.jsx';
import { AppHeader } from './AppHeader.jsx';
import { CurrentTodoList } from './CurrentTodoList.jsx';

const THEME_STORAGE_KEY = 'daylight-color-mode';

export function App() {
  const [mode, setMode] = useState(
    () => (localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light')
  );
  const isDarkMode = mode === 'dark';

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: isDarkMode ? '#28e0cf' : '#435cf5',
        dark: isDarkMode ? '#08b9ac' : '#2e43ce',
        light: isDarkMode ? '#123f45' : '#e9edff',
      },
      secondary: {
        main: isDarkMode ? '#ff8a72' : '#ed6683',
      },
      success: {
        main: isDarkMode ? '#56e39b' : '#159c78',
      },
      warning: {
        main: isDarkMode ? '#ffc857' : '#e58b22',
      },
      background: {
        default: isDarkMode ? '#0b111b' : '#f3f6fc',
        paper: isDarkMode ? '#151f2d' : '#ffffff',
      },
      text: {
        primary: isDarkMode ? '#f2f7ff' : '#202943',
        secondary: isDarkMode ? '#a4b3c8' : '#68758d',
      },
      divider: isDarkMode ? '#2c3b50' : '#e1e7f2',
    },
    shape: {
      borderRadius: 14,
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
      button: {
        fontWeight: 600,
        textTransform: 'none',
      },
    },
  });

  return (
    <AppState>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          className="app-shell"
          data-theme={mode}
          sx={{ display: 'flex' }}
        >
          <AppHeader
            mode={mode}
            onToggleTheme={() => {
              const nextMode = isDarkMode ? 'light' : 'dark';
              localStorage.setItem(THEME_STORAGE_KEY, nextMode);
              setMode(nextMode);
            }}
          />
          <AllTodoLists />
          <CurrentTodoList />
        </Box>
      </ThemeProvider>
    </AppState>
  );
}
