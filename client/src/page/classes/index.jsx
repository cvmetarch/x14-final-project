import React from "react";
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LastPageIcon from '@mui/icons-material/LastPage';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';

import useGlobalContext from "../../context/useGlobalContext";

export default function Classes() {
    const defaultMaterialTheme = createTheme();
    const { getClassList, classList } = useGlobalContext();

    const columns = [
        { title: "Mã lớp học", field: "classId", emptyValue: () => <p>null</p>, width: "10%" },
        { title: "Khóa học", field: "courseName", emptyValue: () => <p>null</p>, width: "10%" },        
        { title: "Tên lớp học", field: "className", emptyValue: () => <p>null</p> },
        { title: "Thời gian học", field: "lTime", emptyValue: () => <p>null</p>, width: "10%" },
        { title: "Ngày bắt đầu", field: "startDate", emptyValue: () => <p>null</p> },
        { title: "Ngày kết thúc", field: "endDate", emptyValue: () => <p>null</p> },
    ];

    React.useEffect(() => {
        getClassList();
    }, []);

    console.log("class list: ", classList);

    return (
        <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
                columns={columns}
                data={classList}
                title="Danh sách lớp học"
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
    );
}