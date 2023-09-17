import React from "react";
import MaterialTable from 'material-table';
import {
    Box,
    Button,
    Modal,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    ThemeProvider,
    createTheme,
} from '@mui/material';
import useGlobalContext from "../../context/useGlobalContext";
import Table from "../../components/Table";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LastPageIcon from '@mui/icons-material/LastPage';
import PreviewIcon from '@mui/icons-material/Preview';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';


const columns = [
    { title: "Mã lớp học", field: "classId", editable: 'never', emptyValue: () => <p>null</p>, width: "10%" },
    { title: "Mã khóa học", field: "courseId", emptyValue: () => <p>null</p> },
    { title: "Khóa học", field: "courseName", editable: 'never', emptyValue: () => <p>null</p> },
    { title: "Tên lớp học", field: "className", emptyValue: () => <p>null</p> },
    { title: "Thời gian học", field: "learningTimeId", emptyValue: () => <p>null</p> },
    { title: "Thời gian học", field: "lTime", editable: 'never', emptyValue: () => <p>null</p> },
    { title: "Ngày bắt đầu", field: "startDate", type: 'date', dateSetting: { locale: "en-GB" }, emptyValue: () => <p>null</p> },
    { title: "Ngày kết thúc", field: "endDate", type: 'date', dateSetting: { locale: "en-GB" }, emptyValue: () => <p>null</p> },
];

const studentColumns = [
    {
        field: 'studentId',
        headerName: 'Mã học viên',
        width: 200
    },
    {
        field: 'studentName',
        headerName: 'Tên học viên',
        width: 300,
    },
]

export default function ClassList() {
    const defaultMaterialTheme = createTheme();
    const {
        getClassList,
        classList,
        updateClass,
        getClassDetail,
        studentList,
        teacherName
    } = useGlobalContext();
    // edit table
    const [tableData, setTableData] = React.useState(classList);
    const [isUpdate, setIsUpdate] = React.useState(false);
    const [isAddStudentOpen, setIsAddStudentOpen] = React.useState(false);
    const [isAddTeacherOpen, setIsAddTeacherOpen] = React.useState(false);
    const [isViewOpen, setIsViewOpen] = React.useState(false);
    // column data
    const [classTitle, setClassTitle] = React.useState("");
    const [classId, setClassId] = React.useState(null);
    const [courseId, setCourseId] = React.useState(null);
    const [timeId, setTimeId] = React.useState(null);
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");
    // add student
    const [studentId, setStudentId] = React.useState(null);
    // add teacher
    const [teacherId, setTeacherId] = React.useState(null);
    const [teacherRoleId, setTeacherRoleId] = React.useState(null);

    const handleAddStudent = () => {
        const classInfoUpdate = {
            courseId,
            name: classTitle,
            timeId,
            startDate: startDate.slice(0, 10) + " 12:00:00",
            endDate: endDate.slice(0, 10) + " 12:00:00",
            studentId: Number(studentId),
            teacherId,
            teacherRoleId
        };
        updateClass(classId, classInfoUpdate);
    }

    const handleAddTeacher = () => {
        const classInfoUpdate = {
            courseId,
            name: classTitle,
            timeId,
            startDate: startDate.slice(0, 10) + " 12:00:00",
            endDate: endDate.slice(0, 10) + " 12:00:00",
            studentId,
            teacherId: Number(teacherId),
            teacherRoleId: Number(teacherRoleId)
        };
        updateClass(classId, classInfoUpdate);
    }

    // open & close modal
    const handleAddStudentOpen = () => setIsAddStudentOpen(true);
    const handleAddTeacherClose = () => setIsAddTeacherOpen(false);
    const handleAddTeacherOpen = () => setIsAddTeacherOpen(true);
    const handleAddStudentClose = () => setIsAddStudentOpen(false);
    const handleViewOpen = () => setIsViewOpen(true);
    const handleViewClose = () => setIsViewOpen(false);

    // get class list
    React.useEffect(() => {
        getClassList();
        getClassDetail(1);
    }, []);

    return (
        <React.Fragment>
            <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                    columns={columns}
                    data={isUpdate ? tableData : classList}
                    title="Danh sách lớp học"
                    editable={{
                        onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
                            const updatedTable = [...classList];
                            updatedTable[oldRow.tableData.id] = newRow;
                            setTableData(updatedTable);
                            setIsUpdate(true);

                            let startDateParsed= new Date(Date.parse(newRow['startDate']));
                            if (startDateParsed.toISOString()!=newRow['startDate']) {
                                newRow['startDate']=startDateParsed.toISOString();
                            }
                            let endDateParsed= new Date(Date.parse(newRow['endDate']));
                            if (endDateParsed.toISOString()!=newRow['endDate']) {
                                newRow['endDate']=endDateParsed.toISOString();
                            }

                            const {
                                classId,
                                courseId,
                                className,
                                learningTimeId,
                                startDate,
                                endDate
                            } = newRow;
                            const classInfoUpdate = {
                                courseId,
                                name: className,
                                timeId: learningTimeId,
                                startDate: startDate.slice(0,10)+ " 12:00:00",
                                endDate: endDate.slice(0,10)+ " 12:00:00",
                                studentId: null,
                                teadcherId: null,
                                teacherRoleId: null,
                            };
                            updateClass(classId, classInfoUpdate);
                            setTimeout(() => resolve(), 500);
                        }),
                        onRowDelete: () => {

                        }
                    }}
                    actions={[
                        {
                            icon: () => <PreviewIcon />,
                            onClick: (e, data) => {
                                getClassDetail(data.classId);
                                setClassTitle(data.className);
                                handleViewOpen();
                            },
                            tooltip: "Xem chi tiết"
                        },
                        {
                            icon: () => <PersonAddAlt1Icon />,
                            onClick: (e, data) => {
                                console.log(data)
                                handleAddTeacherOpen();
                                setClassId(data.classId);
                                setCourseId(data.courseId);
                                setClassTitle(data.className);
                                setTimeId(data.learningTimeId);
                                setStartDate(data.startDate);
                                setEndDate(data.endDate);
                            },
                            tooltip: "Thêm giảng viên"
                        },
                        {
                            icon: () => <GroupAddOutlinedIcon />,
                            onClick: (e, data) => {
                                handleAddStudentOpen();
                                setClassId(data.classId);
                                setCourseId(data.courseId);
                                setClassTitle(data.className);
                                setTimeId(data.learningTimeId);
                                setStartDate(data.startDate);
                                setEndDate(data.endDate);
                            },
                            tooltip: "Thêm học viên"
                        },
                    ]}
                    icons={{
                        Clear: () => <CloseIcon />,
                        Search: () => <SearchIcon />,
                        FirstPage: () => <FirstPageIcon />,
                        LastPage: () => <LastPageIcon />,
                        PreviousPage: () => <ArrowBackIosIcon />,
                        NextPage: () => <ArrowForwardIosIcon />,
                        SortArrow: (props) => (<KeyboardArrowUpIcon {...props} />),
                        Check: () => <SaveIcon />,
                        Edit: () => <EditIcon />,
                        Delete: () => <DeleteIcon />
                    }}

                    options={{
                        paginationType: "stepped",
                        actionsColumnIndex: -1,
                    }}
                />
            </ThemeProvider>
            <Modal
                open={isAddStudentOpen}
                onClose={handleAddStudentClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Thêm học viên vào lớp
                        <Box
                            sx={{ marginLeft: 1, color: "#e22630" }}
                            component="span"
                        >
                            {classTitle}
                        </Box>
                    </Typography>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Mã học viên"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                    />
                    <Box sx={{
                        marginTop: 2,
                        display: "flex",
                        justifyContent: "flex-end"
                    }}>
                        <Button onClick={handleAddStudentClose}>Hủy</Button>
                        <Button
                            variant="contained" sx={{ marginLeft: 2 }}
                            onClick={handleAddStudent}
                        >
                            Thêm
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={isAddTeacherOpen}
                onClose={handleAddTeacherClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Thêm giảng viên vào lớp
                        <Box
                            sx={{ marginLeft: 1, color: "#e22630" }}
                            component="span"
                        >
                            {classTitle}
                        </Box>
                    </Typography>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Mã giảng viên"
                        value={teacherId}
                        onChange={(e) => setTeacherId(e.target.value)}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="teacherRole">Vai trò giảng viên</InputLabel>
                        <Select
                            labelId="teacherRole"
                            id="role"
                            label="Vai trò giảng viên"
                            value={teacherRoleId}
                            onChange={(e) => setTeacherRoleId(e.target.value)}
                        >
                            <MenuItem value={1}>Giảng viên</MenuItem>
                            <MenuItem value={2}>Mentor</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{
                        marginTop: 2,
                        display: "flex",
                        justifyContent: "flex-end"
                    }}>
                        <Button onClick={handleAddTeacherClose}>Hủy</Button>
                        <Button
                            variant="contained" sx={{ marginLeft: 2 }}
                            onClick={handleAddTeacher}
                        >
                            Thêm
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={isViewOpen}
                onClose={handleViewClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 800,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Thông tin lớp học
                        <Box
                            sx={{ marginLeft: 1, color: "#e22630" }}
                            component="span"
                        >
                            {classTitle}
                        </Box>
                    </Typography>
                    <Typography fontWeight={600} marginY={1}>
                        Số lượng học viên:
                        <Box component="span" marginLeft={1} fontWeight={500}>{studentList.length || 0}</Box>
                    </Typography>
                    <Typography fontWeight={600} marginY={1}>
                        Giảng viên:
                        <Box component="span" marginLeft={1} fontWeight={500}>{teacherName}</Box>
                    </Typography>
                    {studentList.length > 0 &&
                        <Table
                            columns={studentColumns}
                            tableData={studentList}
                        />
                    }
                    <Box sx={{
                        marginTop: 2,
                        display: "flex",
                        justifyContent: "flex-end"
                    }}>
                        <Button onClick={handleViewClose}>Đóng</Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}