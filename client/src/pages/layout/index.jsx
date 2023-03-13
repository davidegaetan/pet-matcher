import axios from "axios";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PetsIcon from '@mui/icons-material/Pets';
import { Grid } from "@mui/material";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import Styles from "./styles";

const Logo = ({sx}) => (<Grid container alignItems="center" sx={{...sx,width: "max-content"}}>
    <Grid item>
        <PetsIcon sx={{mr: 1 }} />
    </Grid>
    <Grid item>
        <Typography
            variant="h6"
            noWrap
            sx={{
            mr: 2,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.21rem',
            color: 'inherit',
            lineHeight: '1rem',
            }}
        >
            Mascota
        </Typography>
        <Typography
            variant="h6"
            noWrap
            sx={{
            mr: 2,
            fontFamily: 'monospace',
            fontWeight: 800,
            letterSpacing: '.23rem',
            color: 'inherit',
            lineHeight: '1rem',
            }}
        >
            Matcher
        </Typography>
    </Grid>
    
</Grid>)
const pages = [
    {
        name: 'Add a Pet',
        link: '/pets/new',
    },
    {
        name: 'My Pets',
        link: '/home',
    },
    {
        name: 'Match',
        link: '/pets/matches',
    },];

const adminPages = [
    {
        name: "All pets",
        link: "/asdf"
    },
    {
        name: "Aprove pets",
        link: "/admin/approve"
    }
]

const Layout = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8080/api/user/admin/check', {withCredentials:true})
            .then(res => {
                setIsAdmin(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    const navigate = useNavigate()
    const logout = () => {
        axios.get("http://localhost:8080/api/user/logout", {withCredentials: true})
            .then(res => {
                console.log("saliendo", res?.data);
                navigate("/user/login");
        }).catch( err => {
            console.log("el usuario ya no estaba logueado", err);
            navigate("/");
        }
        )
    }

  return (
    <>
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                <Logo sx={{display: { xs: "none", md: "flex" } }}/>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                    >
                    <MenuIcon />
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                    >
                    {pages.map((page) => (
                        <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                            <Link to={page.link}><Typography textAlign="center" sx={Styles.link} >{page.name}</Typography></Link>
                        </MenuItem>
                    ))}
                    <MenuItem onClick={logout}>
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                    </Menu>
                </Box>
                <Logo sx={{flexGrow: 1, display: { xs: "flex", md: "none" } }} />
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                        <Link to={page.link} key={page.name} >
                            <Button
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        </Link>
                    ))}
                    <Button sx={{ my: 2, color: 'red', display: 'block' }} onClick={logout}>
                        Logout
                    </Button>
                </Box>
                
                {
                    isAdmin && (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Admin Panel">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <AdminPanelSettingsIcon sx={{fill: "white", fontSize: "2rem"}} />
                            </IconButton>
                            </Tooltip>
                            <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            >
                                {
                                    adminPages.map(item => (
                                        <MenuItem onClick={handleCloseUserMenu} key={item.name}>
                                            <Link to={item.link}><Typography textAlign="center">{item.name}</Typography></Link>
                                        </MenuItem>
                                    ))
                                }
                                
                            </Menu>
                        </Box>
                    )
                }
                
                </Toolbar>
            </Container>
            </AppBar>
        <Outlet />
    </>
  )
};

export default Layout;