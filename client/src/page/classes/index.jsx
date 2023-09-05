import React, { useEffect } from "react";
import { 
    Box, 
    Button, 
    Dialog, 
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import useGlobalContext from "../../context/useGlobalContext";

export default function Classes() {
    const { getClassList, classList } = useGlobalContext();
    const [isDialog, setIsDialog] = React.useState(false);

    const openDialog = () => setIsDialog(true);
    const closeDialog = () => setIsDialog(false);

    React.useEffect(() => {
        getClassList();
    }, []);

    console.log("class list: ", classList);

    return (
        <Box>
            <Button variant="outlined" onClick={openDialog}>
                <AddIcon sx={{ marginRight: 0.5 }} />
                Tạo lớp học
            </Button>
            <Dialog open={isDialog}>
                <DialogTitle>Tạo Lớp Học</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button onClick={closeDialog}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}