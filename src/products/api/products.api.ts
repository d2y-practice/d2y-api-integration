import type { Product } from "../types/product";

const BASE_URL = "https://fakestoreapi.com/products";

export async function fetchProduct(): Promise<Product[]> {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}
