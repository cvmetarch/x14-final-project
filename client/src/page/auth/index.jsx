import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import useGlobalContext from "../../context/useGlobalContext";

export default function Auth() {
    const { login } = useGlobalContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = { 
            username, 
            password 
        };
        login(formData);
    }

    return (
        <form
            style={{ 
                width: 345, 
                padding: "24px",
                border: "1px solid #ccc",
            }}
            onSubmit={handleSubmit}
        >
            <Typography variant="h5" component="h2" align="center" mb={1}>
                Đăng nhập
            </Typography>
            <TextField
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                fullWidth
                size="small"
                margin="normal"
                id="username"
                label="Tên đăng nhập"
                variant="standard"
            />
            <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                size="small"
                margin="normal"
                id="password"
                label="Mật khẩu"
                variant="standard"
            />
            <Button
                sx={{
                    mt: 5,
                    fontWeight: "bold",
                    fontSize: 16,
                    height: 36
                }}
                fullWidth
                variant="contained"
                type="submit"
            >
                Đăng nhập
            </Button>
        </form>
    );
}
