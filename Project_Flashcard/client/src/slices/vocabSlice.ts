import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { vocabApi } from "../apis/vocabApi";
import type { Vocab, VocabFormData } from "../types/vocabTypes";

// ✅ Lấy toàn bộ từ vựng
export const getVocabs = createAsyncThunk("vocabs/get", vocabApi.getAll);

// ✅ Tạo từ mới
export const createVocab = createAsyncThunk("vocabs/create", vocabApi.create);

// ✅ Cập nhật từ
export const updateVocab = createAsyncThunk(
  "vocabs/update",
  async ({ id, data }: { id: number; data: VocabFormData }) => {
    return await vocabApi.update(id, data);
  }
);

// ✅ Xóa từ
export const deleteVocab = createAsyncThunk("vocabs/delete", vocabApi.delete);

// ✅ Tìm kiếm từ (chỉ theo word)
export const searchVocabs = createAsyncThunk(
  "vocabs/search",
  async ({
    searchTerm,
    categoryId,
  }: {
    searchTerm: string;
    categoryId?: string;
  }) => {
    const query = [
      `word_like=${encodeURIComponent(searchTerm)}`, // ✅ chỉ tìm trong word
      categoryId ? `categoryId=${categoryId}` : "",
      `_sort=id`,
      `_order=desc`,
    ]
      .filter(Boolean)
      .join("&");

    const response = await fetch(`http://localhost:8080/vocabs?${query}`);
    const data = await response.json();
    return data as Vocab[];
  }
);

// ✅ Lọc từ theo danh mục (mới nhất lên đầu)
export const filterVocabs = createAsyncThunk(
  "vocabs/filter",
  async (categoryId: number) => {
    const response = await fetch(
      `http://localhost:8080/vocabs?categoryId=${categoryId}&_sort=id&_order=desc`
    );
    const data = await response.json();
    return data as Vocab[];
  }
);

// ✅ Đánh dấu đã học
export const markAsLearned = createAsyncThunk(
  "vocabs/markAsLearned",
  async (id: number) => {
    return await vocabApi.update(id, { isLearned: true });
  }
);

// ✅ Lấy từ vựng phân trang
export const getPaginatedVocabs = createAsyncThunk(
  "vocabs/getPaginated",
  async ({
    page,
    limit,
    categoryId,
    searchTerm,
  }: {
    page: number;
    limit: number;
    categoryId?: number | null;
    searchTerm?: string;
  }) => {
    const query = [
      `_page=${page}`,
      `_limit=${limit}`,
      categoryId ? `categoryId=${categoryId}` : "",
      searchTerm ? `word_like=${encodeURIComponent(searchTerm)}` : "", // ✅ nếu muốn tìm chính xác
      `_sort=id`,
      `_order=desc`,
    ]
      .filter(Boolean)
      .join("&");

    const response = await fetch(`http://localhost:8080/vocabs?${query}`);
    const data = await response.json();
    const total = Number(response.headers.get("X-Total-Count"));
    return { data, total };
  }
);

// ✅ Lấy toàn bộ từ theo danh mục (dùng cho flashcard)
export const getAllVocabsByCategory = createAsyncThunk(
  "vocabs/getAllByCategory",
  async (categoryId?: number | null) => {
    const query = categoryId
      ? `?categoryId=${categoryId}&_sort=id&_order=desc`
      : `?_sort=id&_order=desc`;
    const response = await fetch(`http://localhost:8080/vocabs${query}`);
    const data = await response.json();
    return data as Vocab[];
  }
);

// ✅ State
interface VocabState {
  list: Vocab[];
  total: number;
  fullList: Vocab[];
  loading: boolean;
  error: string | null;
}

const initialState: VocabState = {
  list: [],
  total: 0,
  fullList: [],
  loading: false,
  error: null,
};

// ✅ Slice
const vocabSlice = createSlice({
  name: "vocabs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVocabs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVocabs.fulfilled, (state, action: PayloadAction<Vocab[]>) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(getVocabs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load vocabs";
      })

      .addCase(getPaginatedVocabs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getPaginatedVocabs.fulfilled,
        (state, action: PayloadAction<{ data: Vocab[]; total: number }>) => {
          state.list = action.payload.data;
          state.total = action.payload.total;
          state.loading = false;
        }
      )
      .addCase(getPaginatedVocabs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load paginated vocabs";
      })

      .addCase(getAllVocabsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllVocabsByCategory.fulfilled,
        (state, action: PayloadAction<Vocab[]>) => {
          state.fullList = action.payload;
          state.loading = false;
        }
      )
      .addCase(getAllVocabsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to load full vocabulary list";
      })

      .addCase(searchVocabs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchVocabs.fulfilled, (state, action: PayloadAction<Vocab[]>) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(searchVocabs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to search vocabs";
      })

      .addCase(filterVocabs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterVocabs.fulfilled, (state, action: PayloadAction<Vocab[]>) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(filterVocabs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to filter vocabs";
      })

      .addCase(createVocab.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVocab.fulfilled, (state, action: PayloadAction<Vocab>) => {
        state.list.unshift(action.payload);
        state.total += 1;
        state.fullList.unshift(action.payload);
        state.loading = false;
      })
      .addCase(createVocab.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create vocab";
      })

      .addCase(updateVocab.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVocab.fulfilled, (state, action: PayloadAction<Vocab>) => {
        state.list = state.list.map((v) =>
          v.id === action.payload.id ? action.payload : v
        );
        state.fullList = state.fullList.map((v) =>
          v.id === action.payload.id ? action.payload : v
        );
        state.loading = false;
      })
      .addCase(updateVocab.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update vocab";
      })

      .addCase(deleteVocab.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVocab.fulfilled, (state, action: PayloadAction<number>) => {
        state.list = state.list.filter((v) => v.id !== action.payload);
        state.fullList = state.fullList.filter((v) => v.id !== action.payload);
        state.total -= 1;
        state.loading = false;
      })
      .addCase(deleteVocab.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete vocab";
      })

      .addCase(markAsLearned.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
     .addCase(markAsLearned.fulfilled, (state, action: PayloadAction<Vocab>) => {
       state.list = state.list.map((v) =>
       v.id === action.payload.id ? action.payload : v
      );
       state.fullList = state.fullList.map((v) =>
        v.id === action.payload.id ? action.payload : v
       );
       state.loading = false;
      })
      .addCase(markAsLearned.rejected, (state, action) => {
       state.loading = false;
      state.error = action.error.message || "Failed to mark vocab as learned";
      });
  },
});

export default vocabSlice.reducer;
