import React, { useEffect } from "react";
import { Box, Typography, Menu, MenuItem, Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useGlobalContext from "../../context/useGlobalContext";

export default function Class() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <Grid item xs={6} md={3}>
            <Box boxShadow={3} padding={2} sx={{ height: 170 }}>
                <Typography
                    variant="h6"
                    component="h1"
                    color={"red"}
                >
                    X-Career 101
                </Typography>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 1
                }}>
                    <Typography fontWeight="bold">
                        Thời gian học:
                    </Typography>
                    <Box component="span" marginLeft={0.5}>09:15-12:15 Thứ 2-4-6</Box>
                </Box>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 1
                }}>
                    <Typography fontWeight="bold">
                        Giảng viên:
                    </Typography>
                    <Box component="span" marginLeft={0.5}>Đỗ Chinh</Box>
                </Box>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 2
                }}>

                    <Box component="span" sx={{
                        display: "flex",
                        alignItems: "center",
                    }}>
                        <PersonIcon fontSize="small" />
                        <Box component="span" paddingTop={0.1}>20</Box>
                    </Box>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem>Xem chi tiết</MenuItem>
                        <MenuItem>Xóa lớp</MenuItem>
                    </Menu>
                </Box>
            </Box>
        </Grid>
    );
}