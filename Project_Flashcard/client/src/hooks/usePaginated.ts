import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaginatedVocabs } from "../slices/vocabSlice";
import type { RootState, AppDispatch } from "../stores";

interface UsePaginatedVocabsProps {
  categoryId?: number | null;
  searchTerm?: string;
  itemsPerPage?: number;
}

export const usePaginated = ({
  categoryId,
  searchTerm,
  itemsPerPage = 6,
}: UsePaginatedVocabsProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, total, loading, error } = useSelector((state: RootState) => state.vocabs);

  const [page, setPage] = useState(1);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm || "");

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm || "");
    }, 300);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  useEffect(() => {
    dispatch(
      getPaginatedVocabs({
        page,
        limit: itemsPerPage,
        categoryId,
        searchTerm: debouncedSearchTerm || undefined,
      })
    );
  }, [page, categoryId, debouncedSearchTerm, itemsPerPage, dispatch]);

  return {
    vocabs: list,
    total,
    loading,
    error,
    page,
    setPage,
    itemsPerPage,
  };
};
