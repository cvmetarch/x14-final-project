import { Modal, Box } from "@mui/material";
import Form from "../Form";
import image from "../../assets/image/form-image.png";
import useGlobalContext from "../../context/useGlobalContext";

export default function FormModal() {
    const { isModal, closeModal } = useGlobalContext();
    return (
        <Modal
            open={isModal}
            onClose={closeModal}
        >
            <Box sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                display: "flex",
            }}>
                <img src={image} alt="image" width={791} />
                <Form />
            </Box>
        </Modal>
    );
}