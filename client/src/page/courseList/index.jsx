import { Box, Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export default function AdminCourseLists() {
    return (
        <Box>
            <Box sx={{ marginBottom: 4 }}>
                <Link to="/admin/courses-list/course1">
                    <Button variant="outlined" sx={{ marginRight: 2 }}>X-Career</Button>
                </Link>
                <Link to="/admin/courses-list/course1">
                    <Button variant="outlined" sx={{ marginRight: 2 }}>CS Course</Button>
                </Link>
                <Link to="/admin/courses-list/course1">
                    <Button variant="outlined" sx={{ marginRight: 2 }}>Data Analyst</Button>
                </Link>
                <Link to="/admin/courses-list/course1">
                    <Button variant="outlined" sx={{ marginRight: 2 }}>Blockchain</Button>
                </Link>
                <Link to="/admin/courses-list/course1">
                    <Button variant="outlined" sx={{ marginRight: 2 }}>IT BI/BA</Button>
                </Link>
            </Box>
            <Outlet />
        </Box>
    );
}