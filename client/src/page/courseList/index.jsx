import React from 'react';
import { Box, Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import useGlobalContext from "../../context/useGlobalContext";

const buttons = [
    {
        id: 1,
        name: "X-Career",
        path: "X-Career"
    },
    {
        id: 2,
        name: "CS Course",
        path: "CS-Course"
    },
    {
        id: 3,
        name: "Data Analyst",
        path: "Data-Analyst"
    },
    {
        id: 4,
        name: "Blockchain",
        path: "Blockchain"
    },
    {
        id: 5,
        name: "IT BI/BA",
        path: "IT-BI/BA"
    },
]

export default function AdminCourseLists() {
    const { getStudentRegisterByCourse } = useGlobalContext();
    const [courseId, setCourseId] = React.useState(null);

    React.useEffect(() => {
        getStudentRegisterByCourse(courseId);
    }, [courseId]);

    const handleClick = (e) => {
        setCourseId(Number(e.target.id));
    }
    
    return (
        <Box>
            <Box sx={{ marginBottom: 4 }}>
                {buttons.map(button => (
                    <Link 
                        key={button.id} 
                        to={`/admin/courses-list/${button.path}`}
                        onClick={handleClick}
                    >
                        <Button id={button.id} variant="outlined" sx={{ marginRight: 2 }}>
                            {button.name}
                        </Button>
                    </Link>
                ))}
            </Box>
            <Outlet />
        </Box>
    );
}