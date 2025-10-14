import { useState } from "react";
import type { VocabFormData } from "../types/vocabTypes";

export const useVocabForm = (initialData?: VocabFormData) => {
  const [formData, setFormData] = useState<VocabFormData>(
    initialData || { word: "", meaning: "", categoryId: 0, isLearned: false }
  );

  const handleChange = (field: keyof VocabFormData, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({ word: "", meaning: "", categoryId: 0, isLearned: false });
  };

  return { formData, setFormData, handleChange, resetForm };
};
