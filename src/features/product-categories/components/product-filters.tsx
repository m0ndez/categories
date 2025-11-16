import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Button,
  Paper,
  Typography,
  SelectChangeEvent,
  OutlinedInput,
} from "@mui/material";
import { MOCK_CATEGORIES } from "../constants";

interface ProductFiltersProps {
  searchQuery: string;
  selectedCategories: string[];
  inStockOnly: boolean;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (event: SelectChangeEvent<string[]>) => void;
  onInStockChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearFilters: () => void;
  onAddClick: () => void;
}

export const ProductFilters = ({
  searchQuery,
  selectedCategories,
  inStockOnly,
  onSearchChange,
  onCategoryChange,
  onInStockChange,
  onClearFilters,
  onAddClick,
}: ProductFiltersProps) => {
  return (
    <Paper sx={{ p: 3, mb: 3 }} data-testid="product-filters">
      <Typography variant="h6" gutterBottom data-testid="filters-title">
        Product Category
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
        <TextField
          label="Product Name"
          value={searchQuery}
          onChange={onSearchChange}
          sx={{ flexGrow: 1, minWidth: 200 }}
          data-testid="search-input"
        />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            multiple
            value={selectedCategories}
            onChange={onCategoryChange}
            input={<OutlinedInput label="Category" />}
            renderValue={(selected) => selected.join(", ")}
            data-testid="category-select"
          >
            {MOCK_CATEGORIES.map((category) => (
              <MenuItem key={category} value={category}>
                <Checkbox checked={selectedCategories.indexOf(category) > -1} />
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={inStockOnly}
              onChange={onInStockChange}
              data-testid="in-stock-checkbox"
            />
          }
          label="In Stock"
        />

        <Button
          variant="contained"
          color="error"
          onClick={onClearFilters}
          data-testid="clear-button"
        >
          Clear
        </Button>

        <Button
          variant="contained"
          color="success"
          sx={{ ml: "auto" }}
          onClick={onAddClick}
          data-testid="add-button"
        >
          Add
        </Button>
      </Box>
    </Paper>
  );
};
