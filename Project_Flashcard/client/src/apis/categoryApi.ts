import axios from "axios";
import type { Category, CategoryFormData } from "../types/categoryTypes";

const API_URL = "http://localhost:8080/categories";

export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    const res = await axios.get(`${API_URL}?_sort=id&_order=desc`);
    return res.data;
  },

  create: async (data: CategoryFormData): Promise<Category> => {
  const res = await axios.post(API_URL, data); 
  return res.data;
  },

  update: async (id: number, data: CategoryFormData): Promise<Category> => {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  },

  delete: async (id: number): Promise<number> => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  },

  searchByName: async (name: string): Promise<Category[]> => {
    const res = await axios.get(`${API_URL}?name_like=${name}`);
    return res.data;
  },
};
