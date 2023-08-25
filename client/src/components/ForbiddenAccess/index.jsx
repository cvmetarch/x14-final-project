import React from "react";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Backdrop,
    Divider,
    Fade,
    Modal,
    Typography,
    TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useGlobalContext from "../../context/useGlobalContext";

export default function ForbidenAccess() {
    const {
        isModal,
        openModal,
        closeModal,
        login,
        loading,
        isFail,
    } = useGlobalContext();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = { username, password }
        login(formData);
    }

    return (
        <Alert severity="error">
            <AlertTitle sx={{ fontWeight: "bold" }}>Truy cập bị hạn chế</AlertTitle>
            <Box sx={{
                display: "flex",
                alignItems: "center"
            }}>
                <Typography>Bạn cần đăng nhập để có thể truy cập - </Typography>
                <Button
                    variant="outlined"
                    sx={{ marginLeft: 1 }}
                    onClick={openModal}
                >
                    Đăng Nhập
                </Button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={isModal}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={isModal}>
                        <form onSubmit={handleSubmit}>
                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: 'background.paper',
                                border: '1px solid #ddd',
                                boxShadow: 24,
                                borderRadius: 1,
                            }}>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: 2
                                }}>
                                    <Typography id="transition-modal-title" variant="h6" component="h2">
                                        Xác thực truy cập
                                    </Typography>
                                    <Button onClick={closeModal} variant="text" disabled={loading}>
                                        <CloseIcon />
                                    </Button>
                                </Box>
                                <Divider />
                                <Box sx={{ padding: 2 }}>
                                    <TextField
                                        value={username}
                                        fullWidth
                                        id="transition-modal-title"
                                        label="Tên đăng nhập"
                                        variant="outlined"
                                        required
                                        margin="dense"
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <TextField
                                        value={password}
                                        fullWidth
                                        id="transition-modal-title"
                                        label="Mật khẩu"
                                        variant="outlined"
                                        type="password"
                                        required
                                        margin="normal"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Box>
                                <Divider />
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    padding: 2
                                }}>
                                    <Button
                                        variant="contained"
                                        size="medium"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? "Đăng nhập..." : "Đăng nhập"}
                                    </Button>
                                </Box>
                            </Box>
                        </form>
                    </Fade>
                </Modal>
            </Box>
        </Alert>
    );
}