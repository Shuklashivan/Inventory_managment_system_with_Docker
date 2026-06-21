import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await API.post(
        "/auth/register",
        formData
      );

      setSuccess(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #0f172a, #1e293b)",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: 450,
          p: 5,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={1}
        >
          Create Account
        </Typography>

        <Typography
          color="text.secondary"
          textAlign="center"
          mb={4}
        >
          Register to continue
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Full Name"
          name="name"
          margin="normal"
          value={formData.name}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{
            mt: 3,
            py: 1.5,
          }}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress
              size={24}
              color="inherit"
            />
          ) : (
            "Create Account"
          )}
        </Button>

        <Button
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate("/login")}
        >
          Back to Login
        </Button>
      </Paper>
    </Box>
  );
}