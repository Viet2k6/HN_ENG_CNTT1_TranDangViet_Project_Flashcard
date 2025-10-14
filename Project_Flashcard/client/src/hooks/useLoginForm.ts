import { useForm } from "react-hook-form";
import type { LoginFormData } from "../types/authTypes";

export const useLoginForm = () => {
  return useForm<LoginFormData>();
};
