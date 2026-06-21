import { useEffect, useState } from "react";
import API from "../services/api";

import {
  Box,
  Typography,
  Paper,
  Button,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { DataGrid } from "@mui/x-data-grid";

import OrderDialog from "../components/OrderDialog";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchOrders();
    fetchCustomers();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await API.get("/orders/");
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await API.get("/customers/");
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products/");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateOrder = async (orderData) => {
    try {
      await API.post("/orders/", {
        customer_id: Number(orderData.customer_id),
        product_id: Number(orderData.product_id),
        quantity: Number(orderData.quantity),
      });

      setOpenDialog(false);

      fetchOrders();
      fetchProducts();

      alert("Order Created Successfully");
    } catch (error) {
      console.error(error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.detail
      ) {
        alert(error.response.data.detail);
      } else {
        alert("Unable to create order");
      }
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      width: 120,
    },
    {
      field: "customer_id",
      headerName: "Customer ID",
      width: 180,
    },
    {
      field: "product_id",
      headerName: "Product ID",
      width: 180,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 150,
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
          >
            Orders
          </Typography>

          <Typography color="text.secondary">
            Manage customer orders
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Create Order
        </Button>
      </Box>

      <Paper
        sx={{
          p: 3,
          borderRadius: 4,
        }}
      >
        <DataGrid
          rows={orders}
          columns={columns}
          autoHeight
          pageSizeOptions={[5, 10, 20]}
        />
      </Paper>

      <OrderDialog
        open={openDialog}
        handleClose={() =>
          setOpenDialog(false)
        }
        handleSave={handleCreateOrder}
        customers={customers}
        products={products}
      />
    </Box>
  );
}