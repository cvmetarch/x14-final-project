import { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import Form from "../Form";
import formImage from "../../assets/image/form-image.png";

export default function RegisterButton() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>
            <Button
                sx={{
                    width: "100%",
                    height: 32,
                    bgcolor: "#e22630",
                    color: "#fff",
                    fontWeight: "Bold",
                    ":hover": { bgcolor: "#e22630" }
                }}
                onClick={handleOpen}
            >
                Đăng ký
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    display: "flex",
                }}>
                    <img src={formImage} alt="image" width={791} />
                    <Form />
                </Box>
            </Modal>
        </Box>
    );
}