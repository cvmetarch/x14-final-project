import * as React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Person from '@mui/icons-material/Person';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LoginForm from "../auth";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const options = [
    {
        text: 'Danh sách đăng ký',
        link: '/admin/course',
        icon: <LibraryBooksIcon />
    },
    {
        text: 'Giảng viên',
        link: '/admin/teacher',
        icon: <Person />
    },
    {
        text: 'Học viên',
        link: '/admin/student',
        icon: <PeopleAltIcon />
    },
    {
        text: 'Cơ sở',
        link: '/admin/facility',
        icon: <HomeWorkIcon />
    },
    {
        text: 'Lớp học',
        link: '/admin/class',
        icon: <RoomPreferencesIcon />
    },
];


export default function Admin() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [active, setActive] = React.useState("");

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Hệ Thống Quản Lý Đào Tạo
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {options.map((option, index) => (
                        <ListItem
                            key={option.text}
                            disablePadding
                            sx={{
                                display: "block",
                                backgroundColor: option.text === active ? "#eee" : ""
                            }}
                        	onClick={(e) => setActive(e.target.innerText)}
                        >
                            <Link style={{ textDecoration: "none" }} to={option.link}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {option.icon}
                                    </ListItemIcon>
                                    <ListItemText sx={{ color: "#333" }} primary={option.text} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                {/* Content Here */}
                {true ? <Outlet /> : <LoginForm />}
            </Main>
        </Box>
    );
}