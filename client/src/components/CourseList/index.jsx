import { useState, useEffect } from "react";
import { Grid, Box, Typography, Card, CardMedia, CardContent } from "@mui/material";

import axios from "../../config/axiosConfig";
import RegisterButton from "../../components/Button/RegisterButton";
import fullstack from "../../assets/image/full_stack_banner.avif";
import computerScience from "../../assets/image/cs_banner.png";
import dataAnalyst from "../../assets/image/da_banner.png";
import blockchain from "../../assets/image/blockchain_banner.jpg";
import businessAnalyst from "../../assets/image/ba_banner.png";

const images = [
    { image: fullstack, },
    { image: computerScience, },
    { image: dataAnalyst, },
    { image: blockchain, },
    { image: businessAnalyst, },
];

export default function CourseList() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCourses = async () => {
            const { data } = await axios.get("/courses");
            setCourses(data.data);
        }
        getCourses();
    }, []);

    return (
        <>
            <Typography
                variant="h4"
                component="h2"
                textAlign="center"
                marginTop={10}
                marginBottom={4}
                fontWeight={500}
                position="relative"
            >
                LỘ TRÌNH HỌC TẬP
            </Typography>
            <Grid container spacing={{ xs: 4, md: 4 }} columns={{ xs: 4, sm: 12, md: 12 }} marginBottom={20}>
                {courses.map(({ courseId, courseName, courseDescription}, index) => (
                    <Grid key={courseId} item xs={12} md={4}>
                        <Card
                            variant="outlined"
                            sx={{
                                border: 1,
                                borderColor: "#ddd",
                                boxShadow: 3
                            }}
                        >
                            <CardMedia
                                sx={{ height: 220 }}
                                image={images[index].image}
                                title="card image"
                            />
                            <CardContent>
                                <Typography gutterBottom fontSize="18px" fontWeight="bold">{courseName}</Typography>
                                <Typography gutterBottom variant="body2" fontSize="16px">{courseDescription}</Typography>
                                <RegisterButton />
                            </CardContent>
                            <Box></Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}