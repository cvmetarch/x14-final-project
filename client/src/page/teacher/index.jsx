import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material/';
import { DataGrid } from '@mui/x-data-grid';
import useGlobalContext from '../../context/useGlobalContext';

export default function Teacher() {
    const {  getAllTeachers, teachers  } = useGlobalContext();

    useEffect(() => {
        getAllTeachers();
    }, []);

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
        {
            field: 'teacherUsername',
            headerName: 'Tên đăng nhập',
            width: 200,
            sortable: false,
            filterable: false,
        },
        {
            field: 'teacherPassword',
            headerName: 'Mật Khẩu',
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
                    <Button>Thêm giảng viên vào lớp</Button>
                </Box>
            ),
        },
    ];

    const rows = [
        { id: 1, studentName: 'Snow Jon', email: 'SnowJon@gmail.com', phone: "0866763124", course: "Lập trình website", facility: "71 Nguyễn Chí Thanh, Đống Đa, Hà Nội", learningTime: "Từ 19h00 đến 22h15" },
        { id: 2, studentName: 'Lannister Cersei', email: 'LannisterCersei@gmail.com', phone: "0866763124", course: "Nhập môn khoa học máy tính", facility: "22C Thành Công, Ba Đình, Hà Nội", learningTime: "Từ 19h00 đến 22h15" },
        { id: 3, studentName: 'Lannister Jaime', email: 'LannisterJaime@gmail.com', phone: "0866763124", course: "Lập trình blockchain", facility: "490 Phạm Thái Bường - KĐT Phú Mỹ Hưng, Q. 7, TP HCM", learningTime: "Từ 19h00 đến 22h15" },
        { id: 4, studentName: 'Stark Arya', email: 'StarkArya@gmail.com', phone: "0866763124", course: "Lập trình website", facility: "261-263 Phan Xích Long, Q. Phú Nhuận, TP HCM", learningTime: "Từ 19h00 đến 22h15" },
        { id: 5, studentName: 'Targaryen Daenerys', email: 'TargaryenDaenerys@gmail.com', phone: "0866763124", course: "Data Analyst", facility: "71 Nguyễn Chí Thanh, Đống Đa, Hà Nội", learningTime: "Từ 19h00 đến 22h15" },
        { id: 6, studentName: 'Melisandre Morgan', email: "MelisandreMorgan@gmail.com", phone: "0866763124", course: "Lập trình website", facility: "261-263 Phan Xích Long, Q. Phú Nhuận, TP HCM", learningTime: "Từ 19h00 đến 22h15" },
        { id: 7, studentName: 'Clifford Ferrara', email: 'CliffordFerrara@gmail.com', phone: "0866763124", course: "Business Intelligence/Business Analyst", facility: "261-263 Phan Xích Long, Q. Phú Nhuận, TP HCM", learningTime: "Từ 19h00 đến 22h15" },
        { id: 8, studentName: 'Frances Rossini', email: 'FrancesRossini@gmail.com', phone: "0866763124", course: "Nhập môn khoa học máy tính", facility: "71 Nguyễn Chí Thanh, Đống Đa, Hà Nội", learningTime: "Từ 19h00 đến 22h15" },
        { id: 9, studentName: 'Roxie Harvey', email: 'RoxieHarvey@gmail.com', phone: "0866763124", course: "Data Analyst", facility: "22C Thành Công, Ba Đình, Hà Nội", learningTime: "Từ 19h00 đến 22h15" },
        { id: 10, studentName: 'Nguyễn Huỳnh Minh Thuận', email: 'nguyenmthuan18@gmail.com', phone: "0866763124", course: "Business Intelligence/Business Analyst", facility: "71 Nguyễn Chí Thanh, Đống Đa, Hà Nội", learningTime: "Từ 19h00 đến 22h15" },
    ];
    return (
        <React.Fragment>
            <Typography component="h2" variant="h5" mb={1}>DANH SÁCH GIẢNG VIÊN</Typography>
            <Box sx={{ height: 630, width: '100%' }}>
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
            </Box>
        </React.Fragment>
    );
}