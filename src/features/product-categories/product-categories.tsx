import { useState } from "react";
import { Box, Typography, Pagination, SelectChangeEvent } from "@mui/material";
import { useDebounce } from "../../hooks";
import { useProductFilters } from "./hooks";
import { useProductActions } from "./hooks";
import { ProductFilters } from "./components";
import { ProductTable } from "./components";
import { ProductDetailDrawer } from "./components";
import { DeleteConfirmDialog } from "./components";
import { ProductFormDialog } from "./components";
import { MOCK_PRODUCTS } from "./constants";

const ProductCategories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const {
    selectedCategories,
    setSelectedCategories,
    inStockOnly,
    setInStockOnly,
    sortField,
    sortOrder,
    currentPage,
    setCurrentPage,
    filteredAndSortedProducts,
    paginatedProducts,
    totalPages,
    handleClearFilters,
    handleRequestSort,
    setProducts,
  } = useProductFilters({
    initialProducts: MOCK_PRODUCTS,
    debouncedSearchQuery,
  });

  const {
    selectedProduct,
    drawerOpen,
    formDialogOpen,
    deleteDialogOpen,
    productToDelete,
    handleAddClick,
    handleEditClick,
    handleViewClick,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    handleCloseDrawer,
    handleCloseFormDialog,
    handleUpdateProduct,
    handleCreateProduct,
  } = useProductActions(
    filteredAndSortedProducts.length,
    currentPage,
    setCurrentPage,
    setProducts
  );

  const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setSelectedCategories(typeof value === "string" ? value.split(",") : value);
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleInStockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInStockOnly(event.target.checked);
    setCurrentPage(1);
  };

  const handleClearFiltersWithSearch = () => {
    setSearchQuery("");
    handleClearFilters();
  };

  return (
    <Box sx={{ p: 3 }} data-testid="product-categories-container">
      <Typography variant="h4" gutterBottom data-testid="page-title">
        Mini Project: Product Catalog
      </Typography>

      <ProductFilters
        searchQuery={searchQuery}
        selectedCategories={selectedCategories}
        inStockOnly={inStockOnly}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onInStockChange={handleInStockChange}
        onClearFilters={handleClearFiltersWithSearch}
        onAddClick={handleAddClick}
      />

      <ProductTable
        products={paginatedProducts}
        currentPage={currentPage}
        sortField={sortField}
        sortOrder={sortOrder}
        onRequestSort={handleRequestSort}
        onViewClick={handleViewClick}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
          color="primary"
          data-testid="pagination"
        />
      </Box>

      <ProductDetailDrawer
        open={drawerOpen}
        product={selectedProduct}
        onClose={handleCloseDrawer}
      />

      <ProductFormDialog
        open={formDialogOpen}
        product={selectedProduct}
        onClose={handleCloseFormDialog}
        onSubmit={selectedProduct ? handleUpdateProduct : handleCreateProduct}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        product={productToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Box>
  );
};

export default ProductCategories;
