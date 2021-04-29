import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab, Box, Drawer, Typography } from '@material-ui/core';

// Icons
import Logo from '../../assets/icons/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';


import { 
  homePath, 
} from '../../Routes';

// Styles
import { useStyles } from './styles';
import { iconStyle } from '../shared/styles';

export const drawerWidth = 250; //export to use by MainLayout and styles

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
      <FontAwesomeIcon icon={faHome} style={iconStyle.menu}/>
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