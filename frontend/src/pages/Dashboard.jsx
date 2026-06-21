import { useEffect, useState } from "react";
import API from "../services/api";

import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState([
    { title: "Products", value: 0 },
    { title: "Customers", value: 0 },
    { title: "Orders", value: 0 },
    { title: "Low Stock", value: 0 },
  ]);

  const [lowStockProducts, setLowStockProducts] =
    useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const productsResponse =
        await API.get("/products/");

      const customersResponse =
        await API.get("/customers/");

      const ordersResponse =
        await API.get("/orders/");

      const products =
        productsResponse.data;

      const lowStock = products.filter(
        (product) => product.stock <= 5
      );

      setStats([
        {
          title: "Products",
          value: products.length,
        },
        {
          title: "Customers",
          value:
            customersResponse.data.length,
        },
        {
          title: "Orders",
          value:
            ordersResponse.data.length,
        },
        {
          title: "Low Stock",
          value: lowStock.length,
        },
      ]);

      setLowStockProducts(lowStock);
    } catch (error) {
      console.error(error);
    }
  };

  const cardColors = [
    "#2563eb",
    "#059669",
    "#7c3aed",
    "#ea580c",
  ];

  const chartData = [
    {
      name: "Products",
      value: stats[0].value,
    },
    {
      name: "Customers",
      value: stats[1].value,
    },
    {
      name: "Orders",
      value: stats[2].value,
    },
    {
      name: "Low Stock",
      value: stats[3].value,
    },
  ];

  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight="bold"
        mb={4}
      >
        Dashboard
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 3,
          mb: 4,
        }}
      >
        {stats.map((item, index) => (
          <Paper
            key={item.title}
            elevation={4}
            sx={{
              p: 3,
              borderRadius: 4,
              color: "white",
              background:
                cardColors[index],
            }}
          >
            <Typography
              sx={{
                opacity: 0.9,
              }}
            >
              {item.title}
            </Typography>

            <Typography
              variant="h3"
              fontWeight="bold"
            >
              {item.value}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 3,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 3,
            minHeight: 400,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={3}
          >
            Inventory Analytics
          </Typography>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="value"
                fill="#2563eb"
                radius={[
                  10,
                  10,
                  0,
                  0,
                ]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        <Paper
          elevation={4}
          sx={{
            p: 3,
            minHeight: 400,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={2}
          >
            Low Stock Products
          </Typography>

          <List>
            {lowStockProducts.map(
              (product) => (
                <ListItem
                  key={product.id}
                >
                  <ListItemText
                    primary={
                      product.name
                    }
                    secondary={`⚠️ Stock Remaining: ${product.stock}`}
                  />
                </ListItem>
              )
            )}
          </List>
        </Paper>
      </Box>
    </Box>
  );
}