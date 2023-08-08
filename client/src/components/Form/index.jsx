import React, { useState, useEffect } from "react";
import {
    FormControl,
    Typography,
    TextField,
    Button,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import useGlobalContext from "../../context/useGlobalContext";
import Loading from "../Loader/index";

export default function Form() {
    const {
        courses,
        facilities,
        learningTimes,
        getFormInfo,
        submitForm,
        loading,
        closeModal,
        openAlert,
    } = useGlobalContext();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [courseId, setCourseId] = useState("");
    const [facilityId, setFacilityId] = useState("");
    const [learningTimeId, setLearningTimeId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name,
            email,
            phone,
            courseId,
            facilityId,
            learningTimeId
        };
        submitForm(formData);
        closeModal();
        openAlert();
    }

    useEffect(() => {
        getFormInfo();
    }, []);

    return (
        <form
            onSubmit={handleSubmit}
            style={{ width: 345, padding: "24px" }}
        >
            <React.Fragment>
                {loading ? <Loading /> : <React.Fragment>
                    <Typography variant="h5" component="h2" align="center">
                    </Typography>
                    <TextField
                        value={name}
                        required
                        fullWidth
                        size="small"
                        margin="normal"
                        id="fullname"
                        label="Họ và tên"
                        variant="outlined"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        value={phone}
                        required
                        fullWidth
                        size="small"
                        margin="normal"
                        id="phone"
                        label="Số điện thoại"
                        variant="outlined"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <TextField
                        value={email}
                        required
                        fullWidth
                        size="small"
                        margin="normal"
                        id="email"
                        label="Email"
                        variant="outlined"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormControl fullWidth size="small" margin="normal">
                        <InputLabel>Khóa Học</InputLabel>
                        <Select label="Khóa Học" defaultValue="" onChange={(e) => setCourseId(e.target.value)}>
                            {courses.map(({ courseId, courseName, courseDescription }) => (
                                <MenuItem key={courseName} value={courseId}>{courseDescription}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth size="small" margin="normal">
                        <InputLabel>Hình thức học</InputLabel>
                        <Select label="Hình thức học" defaultValue="">
                            <MenuItem value={"Online"}>Học online</MenuItem>
                            <MenuItem value={"Offline"}>Học tại các cơ sở của Mindx</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth size="small" margin="normal">
                        <InputLabel>Cơ sở</InputLabel>
                        <Select label="Cở sở" defaultValue="" onChange={(e) => setFacilityId(e.target.value)}>
                            {facilities.map(({ facilityId, facilityName, facilityDescription }) => (
                                <MenuItem key={facilityName} value={facilityId}>{facilityDescription}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth size="small" margin="normal">
                        <InputLabel>Thời gian học</InputLabel>
                        <Select label="Thời gian học" defaultValue="" onChange={(e) => setLearningTimeId(e.target.value)}>
                            {learningTimes.map(({ learningTimeId, startTime, endTime, weekDay }) => (
                                <MenuItem key={learningTimeId} value={learningTimeId}>
                                    Từ {startTime.substring(0, 5)} đến {endTime.substring(0, 5)}, {weekDay.substring(0, 12)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        sx={{
                            mt: 2,
                            bgcolor: "#e22630",
                            fontWeight: "bold",
                            fontSize: 16,
                            ":hover": {
                                bgcolor: "#e22630"
                            }
                        }}
                        fullWidth
                        variant="contained"
                        type="submit"
                    >
                        Đăng ký ngay
                    </Button>
                </React.Fragment>}
            </React.Fragment>
        </form>
    );
}
