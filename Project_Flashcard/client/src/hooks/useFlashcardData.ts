import { useEffect, useState } from "react";
import type { Category } from "../types/categoryTypes";
import type { Vocab } from "../types/vocabTypes";
import axios from "axios";

export const useFlashcardData = () => {
  const [vocabulary, setVocabulary] = useState<Vocab[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<number | null>(null);

  useEffect(() => {
    axios.get("http://localhost:8080/vocabs").then((res) => {
      setVocabulary(res.data);
    });
    axios.get("http://localhost:8080/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const filteredVocabulary = currentCategory
    ? vocabulary.filter((v) => v.categoryId === currentCategory)
    : vocabulary;

  return {
    vocabulary,
    categories,
    currentCategory,
    setCurrentCategory,
    filteredVocabulary,
    setVocabulary,
  };
};
