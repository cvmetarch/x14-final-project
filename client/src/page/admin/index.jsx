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
import ListAltIcon from '@mui/icons-material/ListAlt';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Person from '@mui/icons-material/Person';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MenuIcon from '@mui/icons-material/Menu';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ForbiddenAccess from "../../components/ForbiddenAccess";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import useGlobalContext from '../../context/useGlobalContext';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import { Button } from '@mui/material';

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
        link: '/admin/courses-list',
        icon: <LibraryBooksIcon />
    },
    {
        text: 'Lớp học',
        link: '/admin/class-list',
        icon: <MeetingRoomIcon />
    },
    {
        text: 'Giảng viên',
        link: '/admin/teachers',
        icon: <Person />
    },
    {
        text: 'Học viên',
        link: '/admin/students',
        icon: <PeopleAltIcon />
    },
    {
        text: 'Cơ sở',
        link: '/admin/facilities',
        icon: <HomeWorkIcon />
    },
];


export default function AdminLayout() {
    const theme = useTheme();
    const {
        isModal,
        openModal,
        closeModal,
        logout
    } = useGlobalContext();
    const [open, setOpen] = React.useState(false);
    const [active, setActive] = React.useState("");

    const token = JSON.parse(sessionStorage.getItem("auth"))?.token;

    const handleDrawerOpen = () => {
        if (token) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
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
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton onClick={openModal}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText sx={{ color: "#333" }} primary="Đăng xuất" />
                        </ListItemButton>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={isModal}
                            closeAfterTransition
                            slots={{ backdrop: Backdrop }}
                            slotProps={{
                                backdrop: {
                                    timeout: 500,
                                },
                            }}
                        >
                            <Fade in={isModal}>
                                <Box sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 400,
                                    bgcolor: 'background.paper',
                                    p: 4,
                                }}>
                                    <Typography id="transition-modal-title" variant="h6" component="h2">
                                        Bạn muốn đăng xuất khỏi hệ thống
                                    </Typography>
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                        marginTop: 2
                                    }}>
                                        <Button variant="outlined" onClick={closeModal}>Hủy</Button>
                                        <Button variant="contained" sx={{ marginLeft: 2 }} onClick={logout}>Xác nhận</Button>
                                    </Box>
                                </Box>
                            </Fade>
                        </Modal>
                    </ListItem>
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                {/* Content Here */}
                {token ? <Outlet /> : <ForbiddenAccess />}
            </Main>
        </Box>
    );
}