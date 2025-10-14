import { useForm } from "react-hook-form";
import type { CategoryFormData } from "../types/categoryTypes";

export const useCategoryForm = (defaultValues?: Partial<CategoryFormData>) => {
  return useForm<CategoryFormData>({
    defaultValues: {
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
    },
  });
};
