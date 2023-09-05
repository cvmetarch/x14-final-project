import React from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
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
    let date = new Date().toLocaleDateString();
    return date;
}

export default function StudentRegisterCourses({ courseId, courseName }) {
    const defaultMaterialTheme = createTheme();
    const {
        getStudentRegisterByCourse,
        studentRegisters,
        createClass
    } = useGlobalContext();
    const [id, setId] = React.useState(courseId);
    const [timeId, setTimeId] = React.useState(1);
    const [startDate, setStartDate] = React.useState(dayjs("2023-9-5"));
    const [endDate, setEndDate] = React.useState(dayjs("2023-9-5"));
    const [isDialog, setIsDialog] = React.useState(false);

    const columns = [
        { title: "MSHV", field: "studentId", emptyValue: () => <p>null</p>, sorting: false, width: "10%" },
        { title: "Họ và tên", field: "studentName", emptyValue: () => <p>null</p> },
        { title: "Email", field: "studentEmail", emptyValue: () => <p>null</p> },
        { title: "Cơ sở", field: "facilityId", emptyValue: () => <p>null</p>, width: "10%" },
        { title: "Mã khóa học", field: "courseId", emptyValue: () => <p>null</p>, width: "10%" },
        { title: "Thời gian học", field: "learningTimeId", emptyValue: () => <p>null</p>, width: "10%" },
        { title: "Ngày đăng ký", field: "registerDate", emptyValue: () => <p>null</p> },
        { title: "Trạng thái", field: "registerCourseStatusId", emptyValue: () => <p>null</p>, width: "10%" },
    ];

    const openDialog = () => setIsDialog(true);
    const closeDialog = () => setIsDialog(false);

    const handelUpdate = () => {
        setId(courseId);
    }

    const handleCreate = () => {
        const classInfo = {
            courseId: id,
            name: courseName,
            timeId,
            startDate,
            endDate
        };
        console.log(classInfo);
        //createClass(classInfo);
        setIsDialog(false);
    }

    React.useEffect(() => {
        getStudentRegisterByCourse(id);
    }, [id]);

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
                    <Button variant="outlined" onClick={openDialog}>
                        <AddIcon sx={{ marginRight: 0.5 }} />
                        Tạo lớp học
                    </Button>
                    <Dialog open={isDialog}>
                        <DialogTitle>Tạo Lớp Học</DialogTitle>
                        <DialogContent sx={{ width: "420px" }}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="courseId-label">Mã khóa học</InputLabel>
                                <Select
                                    labelId="courseId-label"
                                    id="courseId"
                                    label="Mã khóa học"
                                    defaultValue={id}
                                >
                                    <MenuItem value={id}>{id}</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="courseName-label">Tên khóa học</InputLabel>
                                <Select
                                    labelId="courseName-label"
                                    id="courseName"
                                    label="Tên khóa học"
                                    defaultValue={courseName}
                                >
                                    <MenuItem value={courseName}>{courseName}</MenuItem>
                                </Select>
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
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={9}>9</MenuItem>
                                </Select>
                            </FormControl>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <FormControl fullWidth margin="normal">
                                    <DatePicker
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.$d)}
                                        label="Ngày bắt đầu"
                                    />
                                </FormControl>
                                <FormControl fullWidth margin="normal">
                                    <DatePicker
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.$d)}
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
                        editable={{
                            onRowAdd: (newRow) => new Promise((resolve, reject) => {
                                setTableData([...tableData, newRow]);
                                resolve();
                            })
                        }}
                        icons={{
                            Clear: () => <CloseIcon />,
                            Search: () => <SearchIcon />,
                            FirstPage: () => <FirstPageIcon />,
                            LastPage: () => <LastPageIcon />,
                            PreviousPage: () => <ArrowBackIosIcon />,
                            NextPage: () => <ArrowForwardIosIcon />,
                            SortArrow: (props) => (<KeyboardArrowUpIcon {...props} />),
                            Add: () => <PlaylistAddIcon />,
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