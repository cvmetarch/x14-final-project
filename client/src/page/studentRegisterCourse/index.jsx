import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material/';
import { DataGrid } from '@mui/x-data-grid';
import useGlobalContext from '../../context/useGlobalContext';

export default function StudentRegisterCourses({ courseName }) {
    const { getStudentRegisterByCourse, studentRegisters } = useGlobalContext();

    useEffect(() => {
        getStudentRegisterByCourse();
    }, []);

    const columns = [
        { field: 'studentId', headerName: 'MSHV', width: 70 },
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
            width: 120,
            sortable: false,
            filterable: false,
        },
        {
            field: 'facilityId',
            headerName: 'Cơ sở',
            width: 200,
            sortable: false,
            filterable: false,
        },
        {
            field: 'learningTimeId',
            headerName: 'Thời gian học',
            width: 200,
            sortable: false,
            filterable: false,
        },
        {
            field: 'registerDate',
            headerName: 'Ngày đăng ký',
            width: 200,
            sortable: false,
            filterable: false,
        },
        {
            field: 'registerCourseStatusId',
            headerName: 'Trạng thái',
            width: 100,
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
                    <Button variant="outlined">Thêm học viên vào lớp</Button>
                </Box>
            ),
        },
    ];

    console.log(studentRegisters);
    return (
        <React.Fragment>
            <Typography component="h2" variant="h5" mb={1}>DANH SÁCH HỌC VIÊN ĐĂNG KÝ KHÓA HỌC {courseName}</Typography>
            <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid
                    columns={columns}
                    rows={studentRegisters}
                    getRowId={(studentRegisters) => studentRegisters.studentId}
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