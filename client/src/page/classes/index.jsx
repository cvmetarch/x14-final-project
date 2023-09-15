import React from "react";
import {
    Box,
    Button,
    InputLabel,
    MenuItem,
    FormControl,
    Select
} from "@mui/material";
import useGlobalContext from "../../context/useGlobalContext";

export default function Classes() {
    const { getCourses, courses, getClassDetail } = useGlobalContext();
    const [courseId, setCourseId] = React.useState("");

    React.useEffect(() => {
        getCourses();
    }, []);

    React.useEffect(() => {
        if (courseId) {
            getClassDetail(courseId);
        }
    }, [courseId]);


    return (
        <Box sx={{ width: 200 }}>
            <FormControl fullWidth>
                <InputLabel id="course">Khóa học</InputLabel>
                <Select
                    labelId="course"
                    id="course-select"
                    label="Khóa học"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                >
                    {courses.map(({ courseId, courseName }) => (
                        <MenuItem key={courseId} value={courseId}>{courseName}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box >
    );
}