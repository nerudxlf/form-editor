import React from 'react';
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <AppBar sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <Toolbar>
                <Typography
                    variant="h6"
                    component="span"
                    sx={{flexGrow: 1}}
                >
                    Data
                </Typography>
                <Link to="/">
                    <Button variant="standard" sx={{color: "white"}}>
                        Главная
                    </Button>
                </Link>
                <Link to="/form">
                    <Button variant="standard" sx={{color: "white"}}>
                        Формы
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Header;