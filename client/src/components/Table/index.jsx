import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function Table({ columns, tableData}) {
    return (
        <React.Fragment>
            <DataGrid
                columns={columns}
                rows={tableData}
                getRowId={(tableData) => tableData.studentId}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[5]}
            />
        </React.Fragment>
    );
}