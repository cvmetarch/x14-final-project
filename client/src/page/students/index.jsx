import React from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useGlobalContext from '../../context/useGlobalContext';

export default function Student() {
    const defaultMaterialTheme = createTheme();
    const { getAllStudents, students } = useGlobalContext();

    React.useEffect(() => {
        getAllStudents();
    }, []);

    console.log(students);

    const columns = [
        { title: "ID", field: "studentId", emptyValue: () => <p>-</p>, width: "10%"},
        { title: "Họ và tên", field: "studentName", emptyValue: () => <p>-</p> },
        { title: "Email", field: "studentEmail", emptyValue: () => <p>-</p> },
        { title: "Số điện thoại", field: "studentPhone", emptyValue: () => <p>-</p> },
        { title: "Ngày sinh", field: "studentDob", emptyValue: () => <p>-</p> },
    ]

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                    columns={columns}
                    data={students}
                    title="Danh sách học viên"
                    icons={{
                        Clear: () => <CloseIcon />,
                        Search: () => <SearchIcon />,
                        FirstPage: () => <FirstPageIcon />,
                        LastPage: () => <LastPageIcon />,
                        PreviousPage: () => <ArrowBackIosIcon />,
                        NextPage: () => <ArrowForwardIosIcon />,
                        SortArrow: (props) => (<KeyboardArrowUpIcon {...props} />),
                    }}
                />
            </ThemeProvider>
        </div>
    );
}