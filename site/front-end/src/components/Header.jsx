import React from 'react';
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h6" component="span" sx={{flexGrow: 1}}>Site</Typography>
                <Link to="/"><Button variant="standard" sx={{color: "white"}}>Home</Button></Link>
                <Link to="/form"><Button variant="standard" sx={{color: "white"}}>Form</Button></Link>
            </Toolbar>
        </AppBar>
    );
};

export default Header;