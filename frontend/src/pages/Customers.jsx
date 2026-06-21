import { useEffect, useState } from "react";
import API from "../services/api";

import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { DataGrid } from "@mui/x-data-grid";

import CustomerDialog from "../components/CustomerDialog";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await API.get("/customers/");
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveCustomer = async (
    customerData
  ) => {
    try {
      if (selectedCustomer) {
        await API.put(
          `/customers/${selectedCustomer.id}`,
          customerData
        );
      } else {
        await API.post(
          "/customers/",
          customerData
        );
      }

      setOpenDialog(false);
      setSelectedCustomer(null);

      fetchCustomers();
    } catch (error) {
      console.error(error);
      alert("Unable to save customer");
    }
  };

  const handleDeleteCustomer = async (
    id
  ) => {
    const confirmDelete = window.confirm(
      "Delete this customer?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/customers/${id}`);
      fetchCustomers();
    } catch (error) {
      console.error(error);
      alert("Unable to delete customer");
    }
  };

  const filteredCustomers =
    customers.filter((customer) =>
      customer.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
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
              setSelectedCustomer(
                params.row
              );
              setOpenDialog(true);
            }}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            color="error"
            onClick={() =>
              handleDeleteCustomer(
                params.row.id
              )
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
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
          >
            Customers
          </Typography>

          <Typography color="text.secondary">
            Manage customer records
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedCustomer(null);
            setOpenDialog(true);
          }}
        >
          Add Customer
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
          placeholder="Search customers..."
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
          rows={filteredCustomers}
          columns={columns}
          autoHeight
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
        />
      </Paper>

      <CustomerDialog
        open={openDialog}
        customer={selectedCustomer}
        handleClose={() => {
          setOpenDialog(false);
          setSelectedCustomer(null);
        }}
        handleSave={handleSaveCustomer}
      />
    </Box>
  );
}