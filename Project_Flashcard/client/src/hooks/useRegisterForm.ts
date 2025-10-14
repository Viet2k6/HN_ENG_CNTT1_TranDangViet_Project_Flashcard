import { useForm } from "react-hook-form";
import type { RegisterFormData } from "../types/authTypes";

export const useRegisterForm = () => {
  return useForm<RegisterFormData>();
};
