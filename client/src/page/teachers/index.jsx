import React from 'react';
import { Box, Button, ThemeProvider, createTheme } from '@mui/material';
import MaterialTable from 'material-table';

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useGlobalContext from '../../context/useGlobalContext';

export default function Teacher() {
    const defaultMaterialTheme = createTheme();
    const { teachers } = useGlobalContext();

    const columns = [
        { title: "Mã giảng viên", field: "teacherId", emptyValue: () => <p>-</p>, width: "10%" },
        { title: "Tên giảng viên", field: "teacherName", emptyValue: () => <p>-</p> },
        { title: "Email", field: "teacherEmail", emptyValue: () => <p>-</p> },
        { title: "Số điện thoại", field: "teacherPhone", emptyValue: () => <p>-</p> },
        { title: "Tài khoản", field: "teacherUsername", emptyValue: () => <p>-</p> },
        // { title: "Mật khẩu", field: "teacherPassword", emptyValue: () => <p>-</p> },
    ]

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                    columns={columns}
                    data={teachers}
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