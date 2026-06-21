import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import Link from "@mui/material/Link";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await loginUser(email, password);

      if (data.message === "Login Successful") {
        login({
          email,
        });

        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Login failed");
      console.error(err);
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
          width: 420,
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
          InventoryPro
        </Typography>

        <Typography
          color="text.secondary"
          textAlign="center"
          mb={4}
        >
          Sign in to continue
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          margin="normal"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{
           mt: 3,
           py: 1.5,
    }}
         onClick={handleLogin}
         disabled={loading}
       >
        {loading ? (
        <CircularProgress
          size={24}
          color="inherit"
       />
  ) : (
    "Sign In"
  )}
</Button>

<Box textAlign="center" mt={2}>
  <Link
    component="button"
    variant="body2"
    onClick={() => navigate("/register")}
  >
    Create New Account
  </Link>
</Box>
      </Paper>
    </Box>
  );
}