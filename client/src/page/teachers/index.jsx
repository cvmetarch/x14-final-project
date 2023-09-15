import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material/';
import { DataGrid } from '@mui/x-data-grid';
import useGlobalContext from '../../context/useGlobalContext';

export default function Teacher() {
    const { teachers } = useGlobalContext();

    const columns = [
        {
            field: 'teacherId',
            headerName: 'ID',
            width: 70
        },
        {
            field: 'teacherName',
            headerName: 'Họ và tên',
            width: 200,
            sortable: false,
            filterable: false,
        },
        {
            field: 'teacherEmail',
            headerName: 'Email',
            width: 225,
            sortable: false,
            filterable: false,
        },
        {
            field: 'teacherPhone',
            headerName: 'Số điện thoại',
            width: 200,
            sortable: false,
            filterable: false,
        },
        // {
        //     field: 'teacherUsername',
        //     headerName: 'Tên đăng nhập',
        //     width: 200,
        //     sortable: false,
        //     filterable: false,
        // },
        // {
        //     field: 'teacherPassword',
        //     headerName: 'Mật Khẩu',
        //     width: 200,
        //     sortable: false,
        //     filterable: false,
        // },
        {
            field: "actions",
            headerName: "",
            sortable: false,
            filterable: false,
            flex: 1,
            renderCell: (params) => (
                <Box>
                    <Button>Thêm giảng viên vào lớp</Button>
                </Box>
            ),
        },
    ];

    return (
        <React.Fragment>
            <Typography component="h2" variant="h5" mb={1}>DANH SÁCH GIẢNG VIÊN</Typography>
            <div style={{ width: "100%", height: "100%" }}>
                <DataGrid
                    columns={columns}
                    rows={teachers}
                    getRowId={(teachers) => teachers.teacherId}
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
            </div>
        </React.Fragment>
    );
}