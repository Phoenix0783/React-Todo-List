import { DeleteOutlineRounded, Send } from '@mui/icons-material';
import * as Icons from '@mui/icons-material';
import {
  Box,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { useTodoList } from '../hooks/useTodoList.js';
import { useTodoLists } from '../hooks/useTodoLists.js';
import { useAppState } from '../providers/AppState.jsx';

export function CurrentTodoList() {
  const { currentList } = useAppState();
  const { data, newItem, deleteItem, toggleChecked, updateItem } =
    useTodoList(currentList);
  const { updateList } = useTodoLists();
  const [newItemText, setNewItemText] = useState('');
  const [originalListName, setOriginalListName] = useState('');
  const [originalListItems, setOriginalListItems] = useState({});

  useEffect(() => {
    if (data?.name) {
      setOriginalListName(data.name);
    }
  }, [currentList, data?.name]);

  useEffect(() => {
    if (data?.items) {
      setOriginalListItems(
        data.items.reduce((acc, { id, name }) => ({ ...acc, [id]: name }), {})
      );
    }
  }, [data]);

  const Icon = Icons[data?.icon];
  const totalItems = data?.items?.length ?? 0;
  const completedItems = data?.items?.filter(({ checked }) => checked).length ?? 0;
  const completion = totalItems
    ? Math.round((completedItems / totalItems) * 100)
    : 0;

  return (
    <Box component="main" className="current-list-page" sx={{ flexGrow: 1 }}>
      <Toolbar />
      <Box className={`focus-layout${data ? '' : ' is-empty'}`}>
        <Box className="todo-panel" sx={{ flex: 1 }}>
          {data ? (
            <>
              <Box
                className="list-heading"
                sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
              >
                <Box
                  className="list-heading-icon"
                  sx={{
                    border: theme => `1px solid ${theme.palette.divider}`,
                    p: 1,
                    mr: 1,
                    borderRadius: '50%',
                    display: 'flex',
                  }}
                >
                  {Icon ? (
                    <Icon fontSize="large" />
                  ) : (
                    <Icons.List fontSize="large" />
                  )}
                </Box>
                <TextField
                  value={originalListName}
                  onChange={event => {
                    setOriginalListName(event.target.value);
                  }}
                  onBlur={event => {
                    void updateList(data.id, event.target.value);
                  }}
                  className="list-name-field"
                />
              </Box>
              <Divider className="todo-divider" />
              <List
                className="todo-items"
                sx={{
                  width: '100%',
                  bgcolor: 'background.paper',
                  mx: 'auto',
                  mt: 2,
                }}
              >
                {data.items.map(({ id, checked }) => {
                  const labelId = `checkbox-list-label-${id}`;

                  return (
                    <ListItem
                      key={id}
                      className={`todo-item${checked ? ' is-checked' : ''}`}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => deleteItem(id)}
                        >
                          <DeleteOutlineRounded />
                        </IconButton>
                      }
                      disablePadding
                    >
                      <ListItemButton
                        role={undefined}
                        onClick={() => toggleChecked(id)}
                        dense
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked ?? false}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId}>
                          <TextField
                            className="todo-item-field"
                            onClick={e => e.stopPropagation()}
                            onChange={event => {
                              setOriginalListItems({
                                ...originalListItems,
                                [id]: event.target.value,
                              });
                            }}
                            onBlur={event => {
                              void updateItem(id, event.target.value);
                            }}
                            value={originalListItems[id] ?? ''}
                            size="small"
                            variant="standard"
                          />
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  );
                })}
                <ListItem>
                  <Box
                    component="form"
                    className="new-item-form"
                    sx={{ width: 1 }}
                    onSubmit={event => {
                      event.preventDefault();
                      void newItem(newItemText);
                      setNewItemText('');
                    }}
                  >
                    <TextField
                      className="new-item-field"
                      onChange={event => {
                        setNewItemText(event.target.value);
                      }}
                      value={newItemText}
                      margin="normal"
                      id="new-item"
                      label="New Item"
                      type="text"
                      fullWidth
                      variant="filled"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              type="submit"
                              aria-label="submit"
                              edge="end"
                            >
                              <Send />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </ListItem>
              </List>
            </>
          ) : (
            <Box className="empty-list-state">
              <Typography variant="h5">A fresh start</Typography>
              <Typography color="text.secondary">
                Create a list to collect everything you want to get done.
              </Typography>
            </Box>
          )}
        </Box>
        {data && (
          <Box component="aside" className="progress-card">
            <Box className="progress-card-accent" />
            <Typography className="progress-eyebrow">LIST PULSE</Typography>
            <Typography className="progress-title">You’re on your way.</Typography>
            <Typography className="progress-description">
              Small steps add up. Keep your momentum going.
            </Typography>
            <Box className="progress-count">
              <Typography className="progress-completed">
                {completedItems}
              </Typography>
              <Typography className="progress-total">
                / {totalItems} done
              </Typography>
            </Box>
            <LinearProgress
              className="progress-bar"
              variant="determinate"
              value={completion}
              aria-label={`${completion}% of tasks complete`}
            />
            <Box className="progress-footer">
              <Typography>{completion}% complete</Typography>
              <Typography>
                {totalItems - completedItems} left
              </Typography>
            </Box>
            <Box className="progress-note">
              <Icons.AutoAwesomeRounded />
              <Typography>
                {totalItems === 0
                  ? 'Add your first task and make a little progress.'
                  : completedItems === totalItems
                    ? 'Everything is done. Nicely done!'
                    : 'Focus on one task at a time.'}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
