import { Add, DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { usePopupState } from 'material-ui-popup-state/hooks';

import { NewListDialog } from './NewListDialog.jsx';

export function AppHeader({ mode, onToggleTheme }) {
  const dialogState = usePopupState({ variant: 'dialog', popupId: 'new-list' });

  return (
    <>
      <NewListDialog dialogState={dialogState} />
      <AppBar
        className="app-header"
        position="fixed"
        sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Box className="brand-lockup" sx={{ flexGrow: 1 }}>
            <Box className="brand-mark">✓</Box>
            <Box>
              <Typography variant="h6" component="div" className="brand-title">
                TaskFlow
              </Typography>
              <Typography component="div" className="brand-caption">
                Plan it. Do it. Done.
              </Typography>
            </Box>
          </Box>
          <IconButton
            size="large"
            color="inherit"
            aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
            className="header-theme-button"
            onClick={onToggleTheme}
          >
            {mode === 'dark' ? <LightModeOutlined /> : <DarkModeOutlined />}
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="Create a new list"
            className="header-add-button"
            onClick={dialogState.open}
          >
            <Add />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
