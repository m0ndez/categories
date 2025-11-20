import { useState } from "react";
import { Product, ProductFormData } from "../types";
import { ITEMS_PER_PAGE } from "../constants";

type UseProductActionProps = {
  filteredProductsLength: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

export const useProductActions = ({
  filteredProductsLength,
  currentPage,
  setCurrentPage,
  setProducts,
}: UseProductActionProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleAddClick = () => {
    setSelectedProduct(null);
    setFormDialogOpen(true);
  };

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setFormDialogOpen(true);
  };

  const handleViewClick = (product: Product) => {
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== productToDelete.id)
      );
      setDeleteDialogOpen(false);
      setProductToDelete(null);

      const newTotalPages = Math.ceil(
        (filteredProductsLength - 1) / ITEMS_PER_PAGE
      );
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedProduct(null);
  };

  const handleCloseFormDialog = () => {
    setFormDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleUpdateProduct = (data: ProductFormData) => {
    if (selectedProduct) {
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === selectedProduct.id
            ? {
                ...p,
                ...data,
                updatedDate: new Date().toISOString(),
              }
            : p
        )
      );
    }
  };

  const handleCreateProduct = (data: ProductFormData) => {
    setProducts((prevProducts) => {
      const maxId = prevProducts.reduce((max, p) => Math.max(max, p.id), 0);
      const newProduct: Product = {
        ...data,
        id: maxId + 1,
        updatedDate: new Date().toISOString(),
      };
      return [newProduct, ...prevProducts];
    });
  };

  return {
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
  };
};
