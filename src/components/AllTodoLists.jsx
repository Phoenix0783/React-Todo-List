import * as Icons from '@mui/icons-material';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';

import { useTodoLists } from '../hooks/useTodoLists.js';
import { useAppState } from '../providers/AppState.jsx';

export function AllTodoLists() {
  const { data } = useTodoLists(); // add loading
  const { currentList, setCurrentList } = useAppState();

  useEffect(() => {
    if (!currentList) {
      setCurrentList(data[0]?.id);
    }
  }, [currentList, data, setCurrentList]);

  return (
    <Drawer
      className="lists-drawer"
      sx={{
        width: { xs: '100%', sm: 220, md: 280 },
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 220, md: 280 },
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/*Empty Toolbar for spacing*/}
      <Toolbar />
      <Box className="lists-rail-content">
        <Typography className="rail-label">YOUR SPACE</Typography>
        <List className="lists-navigation">
          {data.map(({ name, id, icon }) => {
            const Icon = Icons[icon];
            return (
              <ListItem key={id} disablePadding>
                <ListItemButton
                  className="list-navigation-item"
                  onClick={() => {
                    setCurrentList(id);
                  }}
                  selected={currentList === id}
                >
                  {Icon ? <Icon /> : <Icons.List />}
                  <ListItemText sx={{ ml: 0.5 }} primary={name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}
