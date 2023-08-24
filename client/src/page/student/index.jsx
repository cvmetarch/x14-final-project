import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material/';
import { DataGrid } from '@mui/x-data-grid';
import useGlobalContext from '../../context/useGlobalContext';

export default function Student() {
    const {  getAllStudents, students  } = useGlobalContext();

    useEffect(() => {
        getAllStudents();
    }, []);

    const columns = [
        {
            field: 'studentId',
            headerName: 'ID',
            width: 70
        },
        {
            field: 'studentName',
            headerName: 'Họ và tên',
            width: 200,
            sortable: false,
            filterable: false,
        },
        {
            field: 'studentEmail',
            headerName: 'Email',
            width: 225,
            sortable: false,
            filterable: false,
        },
        {
            field: 'studentPhone',
            headerName: 'Số điện thoại',
            width: 200,
            sortable: false,
            filterable: false,
        },
        {
            field: "actions",
            headerName: "",
            sortable: false,
            filterable: false,
            flex: 1,
            renderCell: (params) => (
                <Box>
                    <Button>Chỉnh sửa</Button>
                    <Button>Xóa</Button>
                </Box>
            ),
        },
    ];

    return (
        <React.Fragment>
            <Typography component="h2" variant="h5" mb={1}>DANH SÁCH HỌC VIÊN</Typography>
            <Box sx={{ height: 630, width: '100%' }}>
                <DataGrid
                    columns={columns}
                    rows={students}
                    getRowId={(students) => students.studentId}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                // checkboxSelection
                // disableRowSelectionOnClick
                />
            </Box>
        </React.Fragment>
    );
}