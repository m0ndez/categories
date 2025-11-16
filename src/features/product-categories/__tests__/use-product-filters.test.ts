import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useProductFilters } from "../hooks/use-product-filters";
import { Product } from "../types";

const mockProducts: Product[] = [
  {
    id: 1,
    productName: "Bluetooth Speaker",
    category: "Audio",
    price: 1890,
    status: "In Stock",
    updatedDate: "2025-11-15T11:12:55",
    image: "https://example.com/image1.jpg",
    description: "High-quality portable Bluetooth speaker",
  },
  {
    id: 2,
    productName: "USB-C Dock",
    category: "Display",
    price: 990,
    status: "Out of Stock",
    updatedDate: "2025-11-10T11:12:55",
    image: "https://example.com/image2.jpg",
    description: "Multi-port USB-C hub",
  },
  {
    id: 3,
    productName: "Wireless Mouse",
    category: "Accessory",
    price: 890,
    status: "In Stock",
    updatedDate: "2025-11-14T09:30:00",
    image: "https://example.com/image3.jpg",
    description: "Ergonomic wireless mouse",
  },
];

describe("useProductFilters Hook", () => {
  describe("Initialization", () => {
    it("should initialize with default values", () => {
      const { result } = renderHook(() =>
        useProductFilters({ initialProducts: mockProducts })
      );

      expect(result.current.products).toEqual(mockProducts);
      expect(result.current.selectedCategories).toEqual([]);
      expect(result.current.inStockOnly).toBe(false);
      expect(result.current.sortField).toBe("updatedDate");
      expect(result.current.sortOrder).toBe("desc");
      expect(result.current.currentPage).toBe(1);
    });

    it("should return correct initial filtered products", () => {
      const { result } = renderHook(() =>
        useProductFilters({ initialProducts: mockProducts })
      );

      expect(result.current.filteredAndSortedProducts).toHaveLength(3);
    });
  });

  describe("Search Filtering", () => {
    it("should filter products by search query", () => {
      const { result } = renderHook(() =>
        useProductFilters({
          initialProducts: mockProducts,
          debouncedSearchQuery: "Bluetooth",
        })
      );

      expect(result.current.filteredAndSortedProducts).toHaveLength(1);
      expect(result.current.filteredAndSortedProducts[0].productName).toBe(
        "Bluetooth Speaker"
      );
    });

    it("should be case-insensitive", () => {
      const { result } = renderHook(() =>
        useProductFilters({
          initialProducts: mockProducts,
          debouncedSearchQuery: "bluetooth",
        })
      );

      expect(result.current.filteredAndSortedProducts).toHaveLength(1);
    });

    it("should return empty array for non-matching search", () => {
      const { result } = renderHook(() =>
        useProductFilters({
          initialProducts: mockProducts,
          debouncedSearchQuery: "NonExistent",
        })
      );

      expect(result.current.filteredAndSortedProducts).toHaveLength(0);
    });
  });

  describe("Category Filtering", () => {
    it("should filter products by single category", () => {
      const { result } = renderHook(() =>
        useProductFilters({ initialProducts: mockProducts })
      );

      act(() => {
        result.current.setSelectedCategories(["Audio"]);
      });

      expect(result.current.filteredAndSortedProducts).toHaveLength(1);
      expect(result.current.filteredAndSortedProducts[0].category).toBe(
        "Audio"
      );
    });

    it("should filter products by multiple categories", () => {
      const { result } = renderHook(() =>
        useProductFilters({ initialProducts: mockProducts })
      );

      act(() => {
        result.current.setSelectedCategories(["Audio", "Display"]);
      });

      expect(result.current.filteredAndSortedProducts).toHaveLength(2);
    });

    it("should show all products when no categories selected", () => {
      const { result } = renderHook(() =>
        useProductFilters({ initialProducts: mockProducts })
      );

      act(() => {
        result.current.setSelectedCategories([]);
      });

      expect(result.current.filteredAndSortedProducts).toHaveLength(3);
    });
  });

  describe("In Stock Filtering", () => {
    it("should filter to show only in-stock products", () => {
      const { result } = renderHook(() =>
        useProductFilters({ initialProducts: mockProducts })
      );

      act(() => {
        result.current.setInStockOnly(true);
      });

      expect(result.current.filteredAndSortedProducts).toHaveLength(2);
      result.current.filteredAndSortedProducts.forEach((product) => {
        expect(product.status).toBe("In Stock");
      });
    });

    it("should show all products when filter is disabled", () => {
      const { result } = renderHook(() =>
        useProductFilters({ initialProducts: mockProducts })
      );

      act(() => {
        result.current.setInStockOnly(false);
      });

      expect(result.current.filteredAndSortedProducts).toHaveLength(3);
    });
  });

  describe("Sorting", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    it("should sort by product name ascending", () => {
      const { result } = renderHook(() =>
        useProductFilters({ initialProducts: mockProducts })
      );

      act(() => {
        result.current.handleRequestSort("productName");
      });

      const products = result.current.filteredAndSortedProducts;
      expect(products[0].productName).toBe("Bluetooth Speaker");
      expect(products[2].productName).toBe("Wireless Mouse");
    });

    it("should sort by product name descending", () => {
      const { result } = renderHook(() =>
        useProductFilters({ initialProducts: mockProducts })
      );

      act(() => {
        result.current.handleRequestSort("productName");
      });

      act(() => {
        result.current.handleRequestSort("productName");
      });

      const products = result.current.filteredAndSortedProducts;
      expect(products[0].productName).toBe("Wireless Mouse");
      expect(products[2].productName).toBe("Bluetooth Speaker");
    });

    it("should sort by price ascending", () => {
      const { result } = renderHook(() =>
        useProductFilters({ initialProducts: mockProducts })
      );

      act(() => {
        result.current.handleRequestSort("price");
      });

      const products = result.current.filteredAndSortedProducts;
      expect(products[0].price).toBe(890);
      expect(products[2].price).toBe(1890);
    });

    it("should sort by updated date descending by default", () => {
      const { result } = renderHook(() =>
        useProductFilters({ initialProducts: mockProducts })
      );

      const products = result.current.filteredAndSortedProducts;
      expect(new Date(products[0].updatedDate).getTime()).toBeGreaterThan(
        new Date(products[1].updatedDate).getTime()
      );
    });
  });

  describe("Pagination", () => {
    it("should calculate total pages correctly", () => {
      const { result } = renderHook(() =>
        useProductFilters({ initialProducts: mockProducts })
      );

      expect(result.current.totalPages).toBe(1); // 3 products with 5 per page
    });

    it("should paginate products correctly", () => {
      const manyProducts = Array.from({ length: 12 }, (_, i) => ({
        ...mockProducts[0],
        id: i + 1,
        productName: `Product ${i + 1}`,
      }));

      const { result } = renderHook(() =>
        useProductFilters({ initialProducts: manyProducts })
      );

      expect(result.current.totalPages).toBe(3); // 12 products / 5 per page
      expect(result.current.paginatedProducts).toHaveLength(5);
    });

    it("should update paginated products when page changes", () => {
      const manyProducts = Array.from({ length: 12 }, (_, i) => ({
        ...mockProducts[0],
        id: i + 1,
        productName: `Product ${i + 1}`,
      }));

      const { result } = renderHook(() =>
        useProductFilters({ initialProducts: manyProducts })
      );

      act(() => {
        result.current.setCurrentPage(2);
      });

      expect(result.current.paginatedProducts).toHaveLength(5);
      expect(result.current.paginatedProducts[0].productName).toBe("Product 6");
    });
  });

  describe("Clear Filters", () => {
    it("should reset all filters to default", () => {
      const { result } = renderHook(() =>
        useProductFilters({ initialProducts: mockProducts })
      );

      // Set some filters
      act(() => {
        result.current.setSelectedCategories(["Audio"]);
        result.current.setInStockOnly(true);
        result.current.handleRequestSort("productName");
        result.current.setCurrentPage(2);
      });

      // Clear filters
      act(() => {
        result.current.handleClearFilters();
      });

      expect(result.current.selectedCategories).toEqual([]);
      expect(result.current.inStockOnly).toBe(false);
      expect(result.current.sortField).toBe("updatedDate");
      expect(result.current.sortOrder).toBe("desc");
      expect(result.current.currentPage).toBe(1);
    });
  });

  describe("Combined Filters", () => {
    it("should apply search and category filters together", () => {
      const { result, rerender } = renderHook(
        ({ searchQuery }) =>
          useProductFilters({
            initialProducts: mockProducts,
            debouncedSearchQuery: searchQuery,
          }),
        { initialProps: { searchQuery: "" } }
      );

      act(() => {
        result.current.setSelectedCategories(["Audio", "Accessory"]);
      });

      rerender({ searchQuery: "wireless" });

      expect(result.current.filteredAndSortedProducts).toHaveLength(1);
      expect(result.current.filteredAndSortedProducts[0].productName).toBe(
        "Wireless Mouse"
      );
    });

    it("should apply all filters together", () => {
      const { result } = renderHook(() =>
        useProductFilters({
          initialProducts: mockProducts,
          debouncedSearchQuery: "wireless",
        })
      );

      act(() => {
        result.current.setSelectedCategories(["Accessory"]);
        result.current.setInStockOnly(true);
      });

      expect(result.current.filteredAndSortedProducts).toHaveLength(1);
      expect(result.current.filteredAndSortedProducts[0].productName).toBe(
        "Wireless Mouse"
      );
    });
  });
});
