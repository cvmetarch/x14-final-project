import { Button } from "@mui/material";
import useGlobalContext from "../../context/useGlobalContext";

export default function RegisterButton({ id }) {
    const { openModal } = useGlobalContext();

    return (
        <Button
            id={id}
            sx={{
                width: "100%",
                height: 32,
                bgcolor: "#e22630",
                color: "#fff",
                fontWeight: "Bold",
                ":hover": { bgcolor: "#e22630" }
            }}
            onClick={(e) => openModal(e.target.id)}
        >
            Đăng ký
        </Button>
    );
}