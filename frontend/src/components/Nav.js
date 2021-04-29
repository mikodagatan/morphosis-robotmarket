import { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Tabs, Tab, Box, Drawer, Typography } from '@material-ui/core';

// Icons
import Logo from '../assets/icons/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'


import { 
  homePath, 
} from '../Routes';

// TODO: Find way to make this responsive.
// There are packages that allow us to determine the element
// dimensions.

export const drawerWidth = 250;

const useStyles = makeStyles(() => ({
  rootDiv: {
    flexGrow: 1,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: '0',
    left: '0',
    height: '100%',
    zIndex: '10',
  },
  root: {},
  indicator: {
    left: '0',
    width: '4px',
    borderRadius: '0 5px 5px 0',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    padding: '5px 20px 5px 15px',
    width: drawerWidth,
  },
  labelIcon: {
    textTransform: 'unset',
    minHeight: 'auto',
  },
  selected: {
    fontWeight: 'bold',
  },
  // drawer
  drawer: {
    border: '0',
  },
  drawerPaper: {
    border: '0',
    width: drawerWidth,
  },
}));

// cannot include in makeStyles for React SVG Components
const navIconStyle = {
  standard: {
    margin: '0 20px 0 0',
  },
};

export default function Nav() {
  const classes = useStyles();

  const navElement = useRef(null);
  const [value, setValue] = useState(0);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  const navItems = [
    [
      'Home',
      homePath,
      <FontAwesomeIcon icon={faCoffee} style={navIconStyle.standard}/>
    ],

  ];

  return (
    <div className={classes.rootDiv}>
      <Drawer
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
        variant="permanent"
        anchor="left"
      >
        <Box
          py={4}
          px={3}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Link to={homePath}>
            <img src={Logo} alt="Logo" style={{ width: '100px' }} />
          </Link>
          <Box p={3} display="flex" justifyContent="center">
            <Typography variant="h3" align="center">
              Robot Market
            </Typography>
          </Box>
        </Box>
        <Tabs
          classes={{ indicator: classes.indicator }}
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Nav"
          className={classes.tabs}
        >
          {navItems.map(([label, url, icon], index) => {
            return (
              <Tab
                classes={{
                  wrapper: classes.wrapper,
                  labelIcon: classes.labelIcon,
                  selected: classes.selected,
                }}
                key={index}
                icon={icon}
                label={label}
                component={Link}
                to={url}
              />
            );
          })}
        </Tabs>
      </Drawer>
    </div>
  );
}