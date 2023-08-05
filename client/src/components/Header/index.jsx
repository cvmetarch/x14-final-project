import { Container, Box } from "@mui/material";
import logo from "../../assets/image/logo.png";

export default function Header() {
    return (
        <Box
            sx={{
                height: 80,
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 2,
                boxShadow: 3,
                bgcolor: "#fff"
            }}
        >
            <Container
                sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <img src={logo} alt="logo" width={137} height={60} />
                <Box>

                </Box>
            </Container>
        </Box>
    );
}
