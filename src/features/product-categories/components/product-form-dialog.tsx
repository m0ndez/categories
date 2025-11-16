import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormHelperText,
} from "@mui/material";
import { useProductForm } from "../hooks";
import { Product, ProductFormData, ProductStatus } from "../types";
import { MOCK_CATEGORIES } from "../constants";

interface ProductFormDialogProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
}

const PRODUCT_STATUSES: ProductStatus[] = ["In Stock", "Out of Stock"];

export const ProductFormDialog = ({
  open,
  product,
  onClose,
  onSubmit,
}: ProductFormDialogProps) => {
  const { register, handleSubmit, errors, isSubmitting } = useProductForm({
    product,
    onSubmit: (data) => {
      onSubmit(data);
      onClose();
    },
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="product-form-dialog-title"
      data-testid="product-form-dialog"
    >
      <DialogTitle
        id="product-form-dialog-title"
        data-testid="form-dialog-title"
      >
        {product ? "Edit Product" : "Add Product"}
      </DialogTitle>
      <form noValidate onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Product Name */}
            <TextField
              label="Product Name"
              fullWidth
              required
              error={!!errors.productName}
              helperText={errors.productName?.message}
              {...register("productName", {
                required: "Product name is required",
                minLength: {
                  value: 3,
                  message: "Product name must be at least 3 characters",
                },
              })}
            />

            {/* Category */}
            <FormControl fullWidth required error={!!errors.category}>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                defaultValue={product?.category || "Audio"}
                {...register("category", {
                  required: "Category is required",
                })}
              >
                {MOCK_CATEGORIES.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && (
                <FormHelperText>{errors.category.message}</FormHelperText>
              )}
            </FormControl>

            {/* Price */}
            <TextField
              label="Price"
              type="number"
              fullWidth
              required
              error={!!errors.price}
              helperText={errors.price?.message}
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: "Price must be greater than or equal to 0",
                },
              })}
            />

            {/* Status */}
            <FormControl fullWidth required error={!!errors.status}>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                defaultValue={product?.status || "In Stock"}
                {...register("status", {
                  required: "Status is required",
                })}
              >
                {PRODUCT_STATUSES.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
              {errors.status && (
                <FormHelperText>{errors.status.message}</FormHelperText>
              )}
            </FormControl>

            {/* Image URL */}
            <TextField
              label="Image URL"
              fullWidth
              required
              error={!!errors.image}
              helperText={errors.image?.message}
              {...register("image", {
                required: "Image URL is required",
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: "Please enter a valid URL",
                },
              })}
            />

            {/* Description */}
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              required
              error={!!errors.description}
              helperText={errors.description?.message}
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
              })}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {product ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
