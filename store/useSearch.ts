import { create } from "zustand";

interface SearchState {
  query: string;
  setQuery: (query: string) => void;
  clearQuery: () => void;
}

export const useSearch = create<SearchState>((set) => ({
  query: "",
  setQuery: (query) => set({ query: query.trim() }),
  clearQuery: () => set({ query: "" }),
}));
