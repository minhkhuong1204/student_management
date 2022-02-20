import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Dashboard from '@material-ui/icons/Dashboard';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import { makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },

    link: {
      color: 'inherit',
      textDecoration: 'none',

      '&.active > div': {
        backgroundColor: theme.palette.action.selected
      }
    }
}));


export function Sidebar() {
    const classes = useStyles();
  return (
    <div className={classes.root}>
        <List component="nav" aria-label='main mailbox folders'>
          <NavLink to="/admin/dashboard" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            </NavLink>
            <NavLink to="/admin/students" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <PeopleAlt />
              </ListItemIcon>
              <ListItemText primary="Students" />
            </ListItem>
            </NavLink>
        </List>
      </div>  
      );
}
