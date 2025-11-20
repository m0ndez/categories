import { SetStateAction } from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useProductActions } from "../hooks/use-product-actions";
import { Product, ProductFormData } from "../types";

const mockProduct: Product = {
  id: 1,
  productName: "Test Product",
  category: "Audio",
  price: 1000,
  status: "In Stock",
  updatedDate: "2025-11-15T11:12:55",
  image: "https://example.com/image.jpg",
  description: "Test description",
};

describe("useProductActions Hook", () => {
  let mockSetProducts: (value: SetStateAction<Product[]>) => void;
  let mockSetCurrentPage: (page: number) => void;

  beforeEach(() => {
    mockSetProducts = vi.fn() as (value: SetStateAction<Product[]>) => void;
    mockSetCurrentPage = vi.fn() as (page: number) => void;
    vi.clearAllMocks();
  });

  describe("Initialization", () => {
    it("should initialize with null/false states", () => {
      const { result } = renderHook(() =>
        useProductActions({
          filteredProductsLength: 10,
          currentPage: 1,
          setCurrentPage: mockSetCurrentPage,
          setProducts: mockSetProducts,
        })
      );

      expect(result.current.selectedProduct).toBeNull();
      expect(result.current.drawerOpen).toBe(false);
      expect(result.current.formDialogOpen).toBe(false);
      expect(result.current.deleteDialogOpen).toBe(false);
      expect(result.current.productToDelete).toBeNull();
    });
  });

  describe("Add Product Flow", () => {
    it("should open form dialog for adding", () => {
      const { result } = renderHook(() =>
        useProductActions({
          filteredProductsLength: 10,
          currentPage: 1,
          setCurrentPage: mockSetCurrentPage,
          setProducts: mockSetProducts,
        })
      );

      act(() => {
        result.current.handleAddClick();
      });

      expect(result.current.formDialogOpen).toBe(true);
      expect(result.current.selectedProduct).toBeNull();
    });

    it("should create new product with correct data", () => {
      const { result } = renderHook(() =>
        useProductActions({
          filteredProductsLength: 10,
          currentPage: 1,
          setCurrentPage: mockSetCurrentPage,
          setProducts: mockSetProducts,
        })
      );

      const formData: ProductFormData = {
        productName: "New Product",
        category: "Audio",
        price: 500,
        status: "In Stock",
        image: "https://example.com/new.jpg",
        description: "New product description",
      };

      act(() => {
        result.current.handleCreateProduct(formData);
      });

      expect(mockSetProducts).toHaveBeenCalledTimes(1);
      expect(mockSetProducts).toHaveBeenCalledWith(expect.any(Function));
    });

    it("should close form dialog", () => {
      const { result } = renderHook(() =>
        useProductActions({
          filteredProductsLength: 10,
          currentPage: 1,
          setCurrentPage: mockSetCurrentPage,
          setProducts: mockSetProducts,
        })
      );

      act(() => {
        result.current.handleAddClick();
      });

      expect(result.current.formDialogOpen).toBe(true);

      act(() => {
        result.current.handleCloseFormDialog();
      });

      expect(result.current.formDialogOpen).toBe(false);
      expect(result.current.selectedProduct).toBeNull();
    });
  });

  describe("Edit Product Flow", () => {
    it("should open form dialog with selected product", () => {
      const { result } = renderHook(() =>
        useProductActions({
          filteredProductsLength: 10,
          currentPage: 1,
          setCurrentPage: mockSetCurrentPage,
          setProducts: mockSetProducts,
        })
      );

      act(() => {
        result.current.handleEditClick(mockProduct);
      });

      expect(result.current.formDialogOpen).toBe(true);
      expect(result.current.selectedProduct).toEqual(mockProduct);
    });

    it("should update product with new data", () => {
      const { result } = renderHook(() =>
        useProductActions({
          filteredProductsLength: 10,
          currentPage: 1,
          setCurrentPage: mockSetCurrentPage,
          setProducts: mockSetProducts,
        })
      );

      act(() => {
        result.current.handleEditClick(mockProduct);
      });

      const updatedData: ProductFormData = {
        productName: "Updated Product",
        category: "Display",
        price: 1500,
        status: "Out of Stock",
        image: "https://example.com/updated.jpg",
        description: "Updated description",
      };

      act(() => {
        result.current.handleUpdateProduct(updatedData);
      });

      expect(mockSetProducts).toHaveBeenCalledTimes(1);
    });

    it("should not update if no product is selected", () => {
      const { result } = renderHook(() =>
        useProductActions({
          filteredProductsLength: 10,
          currentPage: 1,
          setCurrentPage: mockSetCurrentPage,
          setProducts: mockSetProducts,
        })
      );

      const updatedData: ProductFormData = {
        productName: "Updated Product",
        category: "Display",
        price: 1500,
        status: "Out of Stock",
        image: "https://example.com/updated.jpg",
        description: "Updated description",
      };

      act(() => {
        result.current.handleUpdateProduct(updatedData);
      });

      expect(mockSetProducts).not.toHaveBeenCalled();
    });
  });

  describe("View Product Flow", () => {
    it("should open drawer with selected product", () => {
      const { result } = renderHook(() =>
        useProductActions({
          filteredProductsLength: 10,
          currentPage: 1,
          setCurrentPage: mockSetCurrentPage,
          setProducts: mockSetProducts,
        })
      );

      act(() => {
        result.current.handleViewClick(mockProduct);
      });

      expect(result.current.drawerOpen).toBe(true);
      expect(result.current.selectedProduct).toEqual(mockProduct);
    });

    it("should close drawer and clear selected product", () => {
      const { result } = renderHook(() =>
        useProductActions({
          filteredProductsLength: 10,
          currentPage: 1,
          setCurrentPage: mockSetCurrentPage,
          setProducts: mockSetProducts,
        })
      );

      act(() => {
        result.current.handleViewClick(mockProduct);
      });

      expect(result.current.drawerOpen).toBe(true);

      act(() => {
        result.current.handleCloseDrawer();
      });

      expect(result.current.drawerOpen).toBe(false);
      expect(result.current.selectedProduct).toBeNull();
    });
  });

  describe("Delete Product Flow", () => {
    it("should open delete dialog with product to delete", () => {
      const { result } = renderHook(() =>
        useProductActions({
          filteredProductsLength: 10,
          currentPage: 1,
          setCurrentPage: mockSetCurrentPage,
          setProducts: mockSetProducts,
        })
      );

      act(() => {
        result.current.handleDeleteClick(mockProduct);
      });

      expect(result.current.deleteDialogOpen).toBe(true);
      expect(result.current.productToDelete).toEqual(mockProduct);
    });

    it("should delete product on confirmation", () => {
      const { result } = renderHook(() =>
        useProductActions({
          filteredProductsLength: 10,
          currentPage: 1,
          setCurrentPage: mockSetCurrentPage,
          setProducts: mockSetProducts,
        })
      );

      act(() => {
        result.current.handleDeleteClick(mockProduct);
      });

      act(() => {
        result.current.handleConfirmDelete();
      });

      expect(mockSetProducts).toHaveBeenCalledTimes(1);
      expect(result.current.deleteDialogOpen).toBe(false);
      expect(result.current.productToDelete).toBeNull();
    });

    it("should adjust page when deleting last item on page", () => {
      // Scenario: 6 items total (2 pages), currently on page 2, deleting the last item
      // After deletion: 5 items = 1 page, should go back to page 1
      const { result } = renderHook(() =>
        useProductActions({
          filteredProductsLength: 6,
          currentPage: 2,
          setCurrentPage: mockSetCurrentPage,
          setProducts: mockSetProducts,
        })
      );

      act(() => {
        result.current.handleDeleteClick(mockProduct);
      });

      act(() => {
        result.current.handleConfirmDelete();
      });

      expect(mockSetCurrentPage).toHaveBeenCalledWith(1);
    });

    it("should not adjust page when not on last page", () => {
      const { result } = renderHook(() =>
        useProductActions({
          filteredProductsLength: 10,
          currentPage: 1,
          setCurrentPage: mockSetCurrentPage,
          setProducts: mockSetProducts,
        })
      );

      act(() => {
        result.current.handleDeleteClick(mockProduct);
      });

      act(() => {
        result.current.handleConfirmDelete();
      });

      expect(mockSetCurrentPage).not.toHaveBeenCalled();
    });

    it("should cancel delete and close dialog", () => {
      const { result } = renderHook(() =>
        useProductActions({
          filteredProductsLength: 10,
          currentPage: 1,
          setCurrentPage: mockSetCurrentPage,
          setProducts: mockSetProducts,
        })
      );

      act(() => {
        result.current.handleDeleteClick(mockProduct);
      });

      expect(result.current.deleteDialogOpen).toBe(true);

      act(() => {
        result.current.handleCancelDelete();
      });

      expect(result.current.deleteDialogOpen).toBe(false);
      expect(result.current.productToDelete).toBeNull();
      expect(mockSetProducts).not.toHaveBeenCalled();
    });
  });

  describe("State Management", () => {
    it("should handle multiple dialog states independently", () => {
      const { result } = renderHook(() =>
        useProductActions({
          filteredProductsLength: 10,
          currentPage: 1,
          setCurrentPage: mockSetCurrentPage,
          setProducts: mockSetProducts,
        })
      );

      act(() => {
        result.current.handleAddClick();
        result.current.handleViewClick(mockProduct);
        result.current.handleDeleteClick(mockProduct);
      });

      expect(result.current.formDialogOpen).toBe(true);
      expect(result.current.drawerOpen).toBe(true);
      expect(result.current.deleteDialogOpen).toBe(true);
    });

    it("should clear state when closing dialogs", () => {
      const { result } = renderHook(() =>
        useProductActions({
          filteredProductsLength: 10,
          currentPage: 1,
          setCurrentPage: mockSetCurrentPage,
          setProducts: mockSetProducts,
        })
      );

      act(() => {
        result.current.handleEditClick(mockProduct);
        result.current.handleCloseFormDialog();
      });

      expect(result.current.formDialogOpen).toBe(false);
      expect(result.current.selectedProduct).toBeNull();
    });
  });
});
