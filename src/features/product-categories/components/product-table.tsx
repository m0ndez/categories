import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TableSortLabel,
  Stack,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Product, ProductSortField, SortOrder } from "../types";
import { ITEMS_PER_PAGE } from "../constants";
import { formatDate } from "../utils";

interface ProductTableProps {
  products: Product[];
  currentPage: number;
  sortField: ProductSortField;
  sortOrder: SortOrder;
  onRequestSort: (property: ProductSortField) => void;
  onViewClick: (product: Product) => void;
  onEditClick: (product: Product) => void;
  onDeleteClick: (product: Product) => void;
}

export const ProductTable = ({
  products,
  currentPage,
  sortField,
  sortOrder,
  onRequestSort,
  onViewClick,
  onEditClick,
  onDeleteClick,
}: ProductTableProps) => {
  return (
    <TableContainer component={Paper} data-testid="product-table">
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>No</TableCell>
            <TableCell
              sortDirection={sortField === "updatedDate" ? sortOrder : false}
            >
              <TableSortLabel
                active={sortField === "updatedDate"}
                direction={sortField === "updatedDate" ? sortOrder : "asc"}
                onClick={() => onRequestSort("updatedDate")}
              >
                Updated datetime
                {sortField === "updatedDate" ? (
                  <Box component="span" sx={visuallyHidden}>
                    {sortOrder === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={sortField === "productName" ? sortOrder : false}
            >
              <TableSortLabel
                active={sortField === "productName"}
                direction={sortField === "productName" ? sortOrder : "asc"}
                onClick={() => onRequestSort("productName")}
              >
                Product Name
                {sortField === "productName" ? (
                  <Box component="span" sx={visuallyHidden}>
                    {sortOrder === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={sortField === "category" ? sortOrder : false}
            >
              <TableSortLabel
                active={sortField === "category"}
                direction={sortField === "category" ? sortOrder : "asc"}
                onClick={() => onRequestSort("category")}
              >
                Category
                {sortField === "category" ? (
                  <Box component="span" sx={visuallyHidden}>
                    {sortOrder === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
            <TableCell>Image</TableCell>
            <TableCell
              align="right"
              sortDirection={sortField === "price" ? sortOrder : false}
            >
              <TableSortLabel
                active={sortField === "price"}
                direction={sortField === "price" ? sortOrder : "asc"}
                onClick={() => onRequestSort("price")}
              >
                Price
                {sortField === "price" ? (
                  <Box component="span" sx={visuallyHidden}>
                    {sortOrder === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={sortField === "status" ? sortOrder : false}
            >
              <TableSortLabel
                active={sortField === "status"}
                direction={sortField === "status" ? sortOrder : "asc"}
                onClick={() => onRequestSort("status")}
              >
                Status
                {sortField === "status" ? (
                  <Box component="span" sx={visuallyHidden}>
                    {sortOrder === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <TableRow
              key={product.id}
              hover
              data-testid={`product-row-${product.id}`}
            >
              <TableCell>
                {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
              </TableCell>
              <TableCell>{formatDate(product.updatedDate)}</TableCell>
              <TableCell data-testid={`product-name-${product.id}`}>
                {product.productName}
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <Box
                  component="img"
                  src={product.image}
                  alt={product.productName}
                  sx={{
                    width: 50,
                    height: 50,
                    objectFit: "contain",
                    borderRadius: 1,
                  }}
                  data-testid={`product-image-${product.id}`}
                />
              </TableCell>
              <TableCell
                align="right"
                data-testid={`product-price-${product.id}`}
              >
                {product.price.toLocaleString()}
              </TableCell>
              <TableCell>
                <Chip
                  label={product.status}
                  color={product.status === "In Stock" ? "success" : "error"}
                  size="small"
                  data-testid={`product-status-${product.id}`}
                />
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => onViewClick(product)}
                    data-testid={`view-button-${product.id}`}
                  >
                    View
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => onEditClick(product)}
                    data-testid={`edit-button-${product.id}`}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => onDeleteClick(product)}
                    data-testid={`delete-button-${product.id}`}
                  >
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
