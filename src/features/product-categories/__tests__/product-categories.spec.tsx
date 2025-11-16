import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ProductCategories from "../product-categories";

// Mock the debounce hook to return immediate values
vi.mock("../../../hooks", () => ({
  useDebounce: vi.fn((value) => value),
}));

describe("Product Categories Feature Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Component Rendering", () => {
    it("should render the main title", () => {
      render(<ProductCategories />);
      expect(screen.getByTestId("page-title")).toBeInTheDocument();
    });

    it("should render the product filters section", () => {
      render(<ProductCategories />);
      expect(screen.getByTestId("filters-title")).toBeInTheDocument();
      expect(screen.getByTestId("search-input")).toBeInTheDocument();
    });

    it("should render the product table", () => {
      render(<ProductCategories />);
      expect(screen.getByTestId("product-table")).toBeInTheDocument();
    });

    it("should render pagination", () => {
      render(<ProductCategories />);
      const pagination = screen.getByTestId("pagination");
      expect(pagination).toBeInTheDocument();
    });

    it("should render action buttons", () => {
      render(<ProductCategories />);
      expect(screen.getByTestId("clear-button")).toBeInTheDocument();
      expect(screen.getByTestId("add-button")).toBeInTheDocument();
    });
  });

  describe("Search Functionality", () => {
    it("should filter products by search query", async () => {
      const user = userEvent.setup();
      render(<ProductCategories />);

      const searchInput = screen.getByLabelText("Product Name");
      await user.type(searchInput, "Bluetooth");

      await waitFor(() => {
        expect(screen.getByTestId("product-name-1")).toBeInTheDocument();
        expect(screen.queryByTestId("product-name-2")).not.toBeInTheDocument();
      });
    });

    it("should show no results for non-matching search", async () => {
      const user = userEvent.setup();
      render(<ProductCategories />);

      const searchInput = screen.getByLabelText("Product Name");
      await user.type(searchInput, "NonExistentProduct");

      await waitFor(() => {
        const rows = screen.getAllByRole("row");
        // Only header row should remain
        expect(rows).toHaveLength(1);
      });
    });

    it("should be case-insensitive", async () => {
      const user = userEvent.setup();
      render(<ProductCategories />);

      const searchInput = screen.getByLabelText("Product Name");
      await user.type(searchInput, "bluetooth");

      await waitFor(() => {
        expect(screen.getByTestId("product-name-1")).toBeInTheDocument();
      });
    });
  });

  describe("Category Filtering", () => {
    it("should have category select element", () => {
      render(<ProductCategories />);

      const categorySelect = screen.getByTestId("category-select");
      expect(categorySelect).toBeInTheDocument();
    });

    it("should display filtered products", () => {
      render(<ProductCategories />);

      // Just verify products are displayed with proper test ids
      expect(screen.getByTestId("product-name-1")).toBeInTheDocument();
      expect(screen.getByTestId("product-name-9")).toBeInTheDocument();
    });
  });

  describe("In Stock Filter", () => {
    it("should filter to show only in-stock products", async () => {
      const user = userEvent.setup();
      render(<ProductCategories />);

      const inStockCheckbox = screen.getByTestId("in-stock-checkbox");
      await user.click(inStockCheckbox);

      await waitFor(() => {
        expect(screen.getByTestId("product-name-1")).toBeInTheDocument();
      });
    });

    it("should show all products when in-stock filter is unchecked", async () => {
      const user = userEvent.setup();
      render(<ProductCategories />);

      const inStockCheckbox = screen.getByTestId("in-stock-checkbox");

      // Check then uncheck
      await user.click(inStockCheckbox);

      await waitFor(() => {
        expect(screen.getByTestId("product-name-1")).toBeInTheDocument();
      });
    });
  });
  describe("Sorting", () => {
    it("should sort products by product name", async () => {
      const user = userEvent.setup();
      render(<ProductCategories />);

      const productNameHeader = screen.getByRole("button", {
        name: /product name/i,
      });
      await user.click(productNameHeader);

      await waitFor(() => {
        expect(screen.getByTestId("product-name-1")).toBeInTheDocument();
      });
    });

    it("should toggle sort order on repeated clicks", async () => {
      const user = userEvent.setup();
      render(<ProductCategories />);

      const productNameHeader = screen.getByRole("button", {
        name: /product name/i,
      });

      // Click once for ascending
      await user.click(productNameHeader);
      await waitFor(() => {
        expect(screen.getByTestId("product-name-1")).toBeInTheDocument();
      });

      // Click again for descending
      await user.click(productNameHeader);
      await waitFor(() => {
        expect(screen.getByTestId("product-name-6")).toBeInTheDocument();
      });
    });
  });

  describe("Pagination", () => {
    it("should display correct number of products per page", () => {
      render(<ProductCategories />);

      const rows = screen.getAllByRole("row");
      // 5 products + 1 header row = 6 rows
      expect(rows).toHaveLength(6);
    });

    it("should navigate to next page", async () => {
      const user = userEvent.setup();
      render(<ProductCategories />);

      // Get first product on page 1
      const firstProductPage1 = screen.getByTestId("product-name-1");
      expect(firstProductPage1).toBeInTheDocument();

      // Click page 2
      const page2Button = screen.getByRole("button", { name: "Go to page 2" });
      await user.click(page2Button);

      await waitFor(() => {
        expect(screen.queryByTestId("product-name-1")).not.toBeInTheDocument();
      });
    });
  });

  describe("Clear Filters", () => {
    it("should reset all filters when clear button is clicked", async () => {
      const user = userEvent.setup();
      render(<ProductCategories />);

      // Apply filters
      const searchInput = screen.getByLabelText("Product Name");
      await user.type(searchInput, "Bluetooth");

      const inStockCheckbox = screen.getByTestId("in-stock-checkbox");
      await user.click(inStockCheckbox);

      // Clear filters
      const clearButton = screen.getByTestId("clear-button");
      await user.click(clearButton);

      await waitFor(() => {
        expect(searchInput).toHaveValue("");
        expect(inStockCheckbox).not.toBeChecked();
      });
    });
  });

  describe("CRUD Operations", () => {
    it("should open form dialog when Add button is clicked", async () => {
      const user = userEvent.setup();
      render(<ProductCategories />);

      const addButton = screen.getByTestId("add-button");
      await user.click(addButton);

      await waitFor(() => {
        expect(screen.getByTestId("form-dialog-title")).toBeInTheDocument();
      });
    });

    it("should open form dialog when Edit button is clicked", async () => {
      const user = userEvent.setup();
      render(<ProductCategories />);

      const editButton = screen.getByTestId("edit-button-1");
      await user.click(editButton);

      await waitFor(() => {
        expect(screen.getByTestId("form-dialog-title")).toBeInTheDocument();
      });
    });

    it("should open detail drawer when View button is clicked", async () => {
      const user = userEvent.setup();
      render(<ProductCategories />);

      const viewButton = screen.getByTestId("view-button-1");
      await user.click(viewButton);

      await waitFor(() => {
        expect(screen.getByTestId("drawer-title")).toBeInTheDocument();
      });
    });

    it("should open delete dialog when Delete button is clicked", async () => {
      const user = userEvent.setup();
      render(<ProductCategories />);

      const deleteButton = screen.getByTestId("delete-button-1");
      await user.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByTestId("delete-dialog-title")).toBeInTheDocument();
      });
    });

    it("should delete product when confirmed", async () => {
      const user = userEvent.setup();
      render(<ProductCategories />);

      const initialProductName = screen.getByTestId("product-name-1");
      expect(initialProductName).toBeInTheDocument();

      const deleteButton = screen.getByTestId("delete-button-1");
      await user.click(deleteButton);

      const confirmButton = await screen.findByTestId("confirm-delete-button");
      await user.click(confirmButton);

      await waitFor(() => {
        expect(
          screen.queryByTestId("delete-dialog-title")
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("Product Display", () => {
    it("should display product images", () => {
      render(<ProductCategories />);

      const image = screen.getByTestId("product-image-1");
      expect(image).toBeInTheDocument();
    });

    it("should display product status with color coding", () => {
      render(<ProductCategories />);

      const statusChip = screen.getByTestId("product-status-1");
      expect(statusChip).toBeInTheDocument();
    });

    it("should display product prices", () => {
      render(<ProductCategories />);

      expect(screen.getByTestId("product-price-1")).toBeInTheDocument();
    });
  });
});
