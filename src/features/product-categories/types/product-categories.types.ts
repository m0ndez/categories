export type ProductStatus = "In Stock" | "Out of Stock";

export type ProductCategory = "Audio" | "Display" | "Accessory" | "Keyboard";

export type Product = {
  id: number;
  productName: string;
  category: ProductCategory;
  price: number;
  status: ProductStatus;
  updatedDate: string;
  image: string;
  description: string;
};

export type ProductFormData = {
  productName: string;
  category: ProductCategory;
  price: number;
  status: ProductStatus;
  image: string;
  description: string;
};

export type SortField = "productName" | "price" | "updatedDate";
export type SortOrder = "asc" | "desc";

export type ProductFilters = {
  searchQuery: string;
  categories: ProductCategory[];
  inStockOnly: boolean;
  sortField: SortField;
  sortOrder: SortOrder;
};

export type ProductSortField =
  | "updatedDate"
  | "productName"
  | "category"
  | "price"
  | "status";
