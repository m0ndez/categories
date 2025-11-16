import { Box, Drawer, Typography, IconButton, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Product } from "../types";
import { formatDate } from "../utils";

interface ProductDetailDrawerProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailDrawer = ({
  open,
  product,
  onClose,
}: ProductDetailDrawerProps) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      data-testid="product-detail-drawer"
    >
      <Box sx={{ width: 400, p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" data-testid="drawer-title">
            Product Details
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {product && (
          <Box>
            <Box
              component="img"
              src={product.image}
              alt={product.productName}
              sx={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                borderRadius: 1,
                mb: 2,
              }}
            />

            <Typography variant="h6" gutterBottom>
              {product.productName}
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Category
              </Typography>
              <Typography variant="body1">{product.category}</Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Price
              </Typography>
              <Typography variant="h6" color="primary">
                ฿{product.price.toLocaleString()}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Status
              </Typography>
              <Chip
                label={product.status}
                color={product.status === "In Stock" ? "success" : "error"}
                size="small"
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Last Updated
              </Typography>
              <Typography variant="body1">
                {formatDate(product.updatedDate)}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1">{product.description}</Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};
