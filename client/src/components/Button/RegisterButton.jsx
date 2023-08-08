import { Box, Button } from "@mui/material";
import useGlobalContext from "../../context/useGlobalContext";

export default function RegisterButton() {
    const { openModal } = useGlobalContext();
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
                onClick={openModal}
            >
                Đăng ký
            </Button>
        </Box>
    );
}