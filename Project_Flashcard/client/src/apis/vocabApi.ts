import axios from "axios";
import type { Vocab, VocabFormData } from "../types/vocabTypes";

const API_URL = "http://localhost:8080/vocabs";

export const vocabApi = {
  getAll: async (): Promise<Vocab[]> => {
    const res = await axios.get(`${API_URL}?_sort=id&_order=desc`);
    return res.data;
  },

  create: async (data: VocabFormData): Promise<Vocab> => {
    const res = await axios.post(API_URL, data);
    return res.data;
  },

  update: async (id: number, data: Partial<VocabFormData>): Promise<Vocab> => {
    const res = await axios.patch(`${API_URL}/${id}`, data);
    return res.data;
  },

  delete: async (id: number): Promise<number> => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  },

  searchByWord: async (term: string): Promise<Vocab[]> => {
    const res = await axios.get(`${API_URL}?word_like=${term}`);
    return res.data;
  },

  filterByCategory: async (categoryId: number): Promise<Vocab[]> => {
    const res = await axios.get(`${API_URL}?categoryId=${categoryId}`);
    return res.data;
  },
};
