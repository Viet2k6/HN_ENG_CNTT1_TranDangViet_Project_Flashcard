import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Category, CategoryFormData } from "../types/categoryTypes";
import { categoryApi } from "../apis/categoryApi";

export const getCategories = createAsyncThunk("categories/get", categoryApi.getAll);
export const createCategory = createAsyncThunk("categories/create", categoryApi.create);
export const deleteCategory = createAsyncThunk("categories/delete", categoryApi.delete);
export const updateCategory = createAsyncThunk(
  "categories/update",
  async ({ id, data }: { id: number; data: CategoryFormData }) => {
    return await categoryApi.update(id, data);
  }
);
export const searchCategories = createAsyncThunk(
  "categories/search",
  async (name: string) => {
    return await categoryApi.searchByName(name);
  }
);

interface CategoryState {
  list: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  list: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.list = action.payload
          .slice()
          .sort((a, b) => b.id - a.id); 
        state.loading = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch categories";
      })

      .addCase(searchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.list = action.payload
          .slice()
          .sort((a, b) => b.id - a.id); 
        state.loading = false;
      })
      .addCase(searchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Search failed";
      })

      .addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.list.unshift(action.payload);
      })

      .addCase(updateCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.list = state.list.map((cat) =>
          cat.id === action.payload.id ? action.payload : cat
        );
      })

      .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<number>) => {
        state.list = state.list.filter((cat) => cat.id !== action.payload);
      });
  },
});

export default categorySlice.reducer;
