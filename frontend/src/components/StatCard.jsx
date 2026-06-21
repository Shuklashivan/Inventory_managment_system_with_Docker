import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

export default function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        height: "100%",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              color="text.secondary"
            >
              {title}
            </Typography>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              {value}
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: color,
              color: "white",
              p: 2,
              borderRadius: 3,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}