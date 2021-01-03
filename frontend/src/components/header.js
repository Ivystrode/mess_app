import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    appBar : {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    menuButton: {
        marginLeft: `20%`
    }
}));

function Header() {
    const classes = useStyles(); // a CSS class...?

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }


    return (
        <React.Fragment>
            <CssBaseline />

            <AppBar 
                position="static"
                color="white"
                elevation={0}
                className={classes.appBar}
            >

                <Toolbar>
                    <Typography className={classes.Title} variant="h4" color="inherit" noWrap>
                        29 Mess App
                    </Typography>
                    <Button className={classes.menuButton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick}>
                        Menu
                    </Button>
                    <Menu id="main-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem onClick={handleClose}>Log In</MenuItem>
                        <MenuItem onClick={handleClose}>Register</MenuItem>
                    </Menu>
                </Toolbar>
                
            </AppBar>

        </React.Fragment>
    )
}

export default Header