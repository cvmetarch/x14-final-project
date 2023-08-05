import { Box, Container, Typography } from "@mui/material";
import bannerImage from "../../assets/image/banner.png";

export default function Banner() {
    return (
        <Box
            sx={{
                height: 488,
                marginTop: "80px",
                backgroundImage: `url(${bannerImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            }}
        >
            <Container sx={{ position: "relative", height: "100%" }}>
                <Box sx={{ position: "absolute", top: "20%" }}>
                    <Typography sx={{ fontSize: 40, color: "#fff", marginBottom: "18px" }}>KHÓA HỌC LẬP TRÌNH WEBSITE</Typography>
                    <Typography sx={{ fontSize: 30, color: "#fff" }}>
                        CAM KẾT 100% VIỆC LÀM
                    </Typography>
                    <Typography sx={{ fontSize: 30, color: "#fff" }}>
                        SAU 8 THÁNG
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}