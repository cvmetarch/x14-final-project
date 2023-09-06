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

export default function Facility() {
    const defaultMaterialTheme = createTheme();
    const { getFacilityList, facilityList } = useGlobalContext();

    React.useEffect(() => {
        getFacilityList();
    }, []);

    const columns = [
        { title: "ID", field: "facilityId", emptyValue: () => <p>null</p>, width: "10%" },
        { title: "Tên cơ sở", field: "facilityName", emptyValue: () => <p>null</p> },
        { title: "Địa chỉ", field: "facilityDescription", emptyValue: () => <p>null</p> },        
    ]

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                    columns={columns}
                    data={facilityList}
                    title="Danh sách cơ sở"
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