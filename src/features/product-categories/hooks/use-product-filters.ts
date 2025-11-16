import { useState, useMemo } from "react";
import { Product, ProductSortField, SortOrder } from "../types";
import { ITEMS_PER_PAGE } from "../constants";

interface UseProductFiltersProps {
  initialProducts: Product[];
  debouncedSearchQuery?: string;
}

export const useProductFilters = ({
  initialProducts,
  debouncedSearchQuery = "",
}: UseProductFiltersProps) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortField, setSortField] = useState<ProductSortField>("updatedDate");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    if (debouncedSearchQuery) {
      filtered = filtered.filter((product) =>
        product.productName
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (inStockOnly) {
      filtered = filtered.filter((product) => product.status === "In Stock");
    }

    filtered.sort((a, b) => {
      if (sortField === "updatedDate") {
        const aTime = new Date(a.updatedDate).getTime();
        const bTime = new Date(b.updatedDate).getTime();
        return sortOrder === "desc" ? bTime - aTime : aTime - bTime;
      }

      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === "string" && typeof bValue === "string") {
        const comparison = aValue
          .toLowerCase()
          .localeCompare(bValue.toLowerCase());
        return sortOrder === "desc" ? -comparison : comparison;
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
      }

      return 0;
    });

    return filtered;
  }, [
    products,
    debouncedSearchQuery,
    selectedCategories,
    inStockOnly,
    sortField,
    sortOrder,
  ]);

  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / ITEMS_PER_PAGE
  );

  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setInStockOnly(false);
    setSortField("updatedDate");
    setSortOrder("desc");
    setCurrentPage(1);
  };

  const handleRequestSort = (property: ProductSortField) => {
    const isAsc = sortField === property && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortField(property);
    setCurrentPage(1);
  };

  return {
    products,
    setProducts,
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
  };
};
