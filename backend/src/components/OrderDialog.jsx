import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";

export default function OrderDialog({
  open,
  handleClose,
  handleSave,
  customers,
  products,
}) {
  const [formData, setFormData] = useState({
    customer_id: "",
    product_id: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Create Order</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={2}>
          <TextField
            select
            label="Customer"
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            fullWidth
          >
            {customers.map((customer) => (
              <MenuItem
                key={customer.id}
                value={customer.id}
              >
                {customer.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Product"
            name="product_id"
            value={formData.product_id}
            onChange={handleChange}
            fullWidth
          >
            {products.map((product) => (
              <MenuItem
                key={product.id}
                value={product.id}
              >
                {product.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={() => handleSave(formData)}
        >
          Create Order
        </Button>
      </DialogActions>
    </Dialog>
  );
}