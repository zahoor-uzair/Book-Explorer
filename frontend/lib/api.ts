import axios from "axios";
import { BooksResponse } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function fetchBooks(params: {
  q?: string;
  page?: number;
  limit?: number;
}): Promise<BooksResponse> {
  try {
    const response = await axios.get<BooksResponse>(`${API_BASE}/api/books`, {
      params: {
        ...(params.q && { q: params.q }),
        page: params.page ?? 1,
        limit: params.limit ?? 20,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          `Request failed with status ${error.response?.status ?? "unknown"}`,
      );
    }

    throw error;
  }
}
