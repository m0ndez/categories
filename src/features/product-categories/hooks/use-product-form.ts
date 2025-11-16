import { useForm } from "react-hook-form";
import { Product, ProductFormData } from "../types/product-categories.types";

interface UseProductFormProps {
  product: Product | null;
  onSubmit: (data: ProductFormData) => void;
}

export const useProductForm = ({ product, onSubmit }: UseProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<ProductFormData>({
    values: {
      category: "Accessory",
      description: "",
      image: "",
      price: 0,
      productName: "",
      status: "In Stock",
    },
    ...(!!product && {
      values: product,
    }),
  });

  const handleFormSubmit = handleSubmit(onSubmit);

  return {
    register,
    handleSubmit: handleFormSubmit,
    errors,
    isSubmitting,
    reset,
    setValue,
  };
};
