import { useEffect, useState } from "react";
import API from "../services/api";

import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Chip,
  InputAdornment,
  IconButton,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { DataGrid } from "@mui/x-data-grid";

import ProductDialog from "../components/ProductDialog";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products/");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveProduct = async (productData) => {
    try {
      if (selectedProduct) {
        await API.put(`/products/${selectedProduct.id}`, {
          name: productData.name,
          sku: productData.sku,
          price: Number(productData.price),
          stock: Number(productData.stock),
        });
      } else {
        await API.post("/products/", {
          name: productData.name,
          sku: productData.sku,
          price: Number(productData.price),
          stock: Number(productData.stock),
        });
      }

      setOpenDialog(false);
      setSelectedProduct(null);
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Unable to save product");
    }
  };

  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Unable to delete product");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "name",
      headerName: "Product",
      flex: 1,
    },
    {
      field: "sku",
      headerName: "SKU",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      width: 140,
      renderCell: (params) => `₹${params.value}`,
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 120,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) =>
        params.row.stock > 5 ? (
          <Chip label="In Stock" color="success" />
        ) : (
          <Chip label="Low Stock" color="warning" />
        ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => {
              setSelectedProduct(params.row);
              setOpenDialog(true);
            }}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            color="error"
            onClick={() =>
              handleDeleteProduct(params.row.id)
            }
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
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
            Products
          </Typography>

          <Typography color="text.secondary">
            Manage inventory products
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedProduct(null);
            setOpenDialog(true);
          }}
        >
          Add Product
        </Button>
      </Box>

      <Paper
        sx={{
          p: 3,
          borderRadius: 4,
        }}
      >
        <TextField
          fullWidth
          placeholder="Search products..."
          size="small"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <DataGrid
          rows={filteredProducts}
          columns={columns}
          autoHeight
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
        />
      </Paper>

      <ProductDialog
        open={openDialog}
        product={selectedProduct}
        handleClose={() => {
          setOpenDialog(false);
          setSelectedProduct(null);
        }}
        handleSave={handleSaveProduct}
      />
    </Box>
  );
}