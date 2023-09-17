import React from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    TextField,
} from '@mui/material/';
import dayjs from 'dayjs';
import MaterialTable from 'material-table';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ThemeProvider, createTheme } from '@mui/material';
import 'dayjs/locale/en-gb';

import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import CachedIcon from '@mui/icons-material/Cached';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LastPageIcon from '@mui/icons-material/LastPage';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';

import useGlobalContext from '../../context/useGlobalContext';

function currentDate() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

export default function StudentRegisterCourses({ courseId, courseName }) {
    const date = currentDate();
    const defaultMaterialTheme = createTheme();
    const {
        getCourses,
        courses,
        getStudentRegisterByCourse,
        studentRegisters,
        createClass
    } = useGlobalContext();
    const [id, setId] = React.useState(courseId);
    const [isDialog, setIsDialog] = React.useState(false);

    const [courseID, setCourseID] = React.useState(1);
    const [timeId, setTimeId] = React.useState(1);
    const [className, setClassName] = React.useState("");
    const [startDate, setStartDate] = React.useState(dayjs(date));
    const [endDate, setEndDate] = React.useState(dayjs(date));

    const columns = [
        { title: "MSHV", field: "studentId", emptyValue: () => <p>null</p>, sorting: false, width: "10%" },
        { title: "Họ và tên", field: "studentName", emptyValue: () => <p>null</p> },
        { title: "Email", field: "studentEmail", emptyValue: () => <p>null</p> },
        { title: "Cơ sở", field: "facilityName", emptyValue: () => <p>null</p> },
        { title: "Tên khóa học", field: "courseName", emptyValue: () => <p>null</p> },
        { title: "Thời gian học", field: "lTime", emptyValue: () => <p>null</p> },
        { title: "Ngày đăng ký", field: "registerDate", type: 'date', dateSetting: { locale: "en-GB" }, emptyValue: () => <p>null</p> },
        // { title: "Trạng thái", field: "registerCourseStatusDescription", emptyValue: () => <p>null</p> },
    ];

    const openDialog = () => setIsDialog(true);
    const closeDialog = () => setIsDialog(false);

    const handelUpdate = () => {
        setId(courseId);
    }

    const handleCreate = () => {
        const classInfo = {
            courseId: courseID,
            name: className,
            timeId,
            startDate: `${startDate.$y}-${startDate.$M + 1}-${startDate.$D} 00:00:00`,
            endDate: `${endDate.$y}-${endDate.$M + 1}-${endDate.$D} 00:00:00`
        };
        createClass(classInfo);
        setIsDialog(false);
        setCourseID(1);
        setTimeId(1);
        setClassName("");
        setStartDate(dayjs(date));
        setEndDate(dayjs(date));
    }

    React.useEffect(() => {
        getStudentRegisterByCourse(id);
    }, [id]);

    React.useEffect(() => {
        getCourses();
    }, []);

    return (
        <React.Fragment>
            <Typography
                component="h2"
                variant="h5"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 1
                }}
            >
                <Box component="span">
                    HỌC VIÊN ĐĂNG KÝ KHÓA HỌC
                    <Box component="span" sx={{
                        marginLeft: 1,
                        color: "#e22630",
                        textTransform: "uppercase",
                    }}>
                        {courseName}
                    </Box>
                </Box>
                <Box>
                    <Button variant="outlined" onClick={openDialog} >
                        <AddIcon sx={{ marginRight: 0.5 }} />
                        Tạo lớp học
                    </Button>
                    <Dialog open={isDialog}>
                        <DialogTitle>Tạo Lớp Học</DialogTitle>
                        <DialogContent sx={{ width: "420px" }}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="courseId-label">Khóa học</InputLabel>
                                <Select
                                    labelId="courseId-label"
                                    id="courseId"
                                    label="Mã khóa học"
                                    value={courseID}
                                    onChange={(e) => setCourseID(e.target.value)}
                                >
                                    {courses.map(({ courseId, courseName }) => (
                                        <MenuItem key={courseId} value={courseId}>{courseName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    id="outlined-basic"
                                    label="Tên lớp học"
                                    variant="outlined"
                                    value={className}
                                    onChange={(e) => setClassName(e.target.value)}
                                />
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="learningtimes-label">Thời gian học</InputLabel>
                                <Select
                                    labelId="learningtimes-label"
                                    id="learningtimes"
                                    label="Thời gian học"
                                    value={timeId}
                                    onChange={(e) => setTimeId(e.target.value)}
                                >
                                    {studentRegisters.map(({ learningTimeId, lTime }) => (
                                        <MenuItem value={learningTimeId}>{lTime}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
                                <FormControl fullWidth margin="normal">
                                    <DatePicker
                                        value={startDate}
                                        onChange={(e) => setStartDate(e)}
                                        label="Ngày bắt đầu"
                                    />
                                </FormControl>
                                <FormControl fullWidth margin="normal">
                                    <DatePicker
                                        value={endDate}
                                        onChange={(e) => setEndDate(e)}
                                        label="Ngày kết thúc"
                                    />
                                </FormControl>
                            </LocalizationProvider>
                        </DialogContent>
                        <DialogActions sx={{ padding: 3 }}>
                            <Button onClick={closeDialog}>Hủy</Button>
                            <Button onClick={handleCreate} variant="contained">Tạo lớp</Button>
                        </DialogActions>
                    </Dialog>
                    <Button variant="outlined" onClick={handelUpdate} sx={{ marginLeft: 2 }}>
                        <CachedIcon sx={{ marginRight: 0.5 }} />
                        Cập nhật
                    </Button>
                </Box>
            </Typography>
            <Box sx={{ height: "100%", width: '100%' }}>
                <ThemeProvider theme={defaultMaterialTheme}>
                    <MaterialTable
                        columns={columns}
                        data={studentRegisters}
                        title="Danh sách học viên"
                        icons={{
                            Clear: () => <CloseIcon />,
                            Search: () => <SearchIcon />,
                            FirstPage: () => <FirstPageIcon />,
                            LastPage: () => <LastPageIcon />,
                            PreviousPage: () => <ArrowBackIosIcon />,
                            NextPage: () => <ArrowForwardIosIcon />,
                            SortArrow: (props) => (<KeyboardArrowUpIcon {...props} />),
                            Edit: () => <PlaylistAddIcon />,
                            Check: () => <SaveIcon />,
                        }}
                        options={{
                            paginationType: "stepped",
                            actionsColumnIndex: -1,
                        }}
                    />
                </ThemeProvider>
            </Box>
        </React.Fragment>
    );
}