import { Product, ProductDTO } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// --- GET ALL: Obtener todos los productos ---
export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/api/products`);
  if (!response.ok) throw new Error("Error al obtener los productos");

  const data = await response.json();
  console.log("🔎 Respuesta cruda del backend:", data);

  // Adaptamos el formato para devolver siempre un array
  if (Array.isArray(data)) {
    return data;
  } else if (Array.isArray(data.data)) {
    return data.data; // 👈 aquí está tu lista real
  } else {
    console.warn("⚠️ Formato inesperado de respuesta:", data);
    return [];
  }
};

// --- POST: Crear un nuevo producto ---
export const createProduct = async (productData: ProductDTO): Promise<Product> => {
  const response = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error("Error al crear el producto");
  const data = await response.json();
  return data.data || data; // algunos backends envuelven en data
};

// --- PUT: Actualizar un producto existente ---
export const updateProduct = async (
  id: number,
  productData: Partial<ProductDTO>
): Promise<Product> => {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error("Error al actualizar el producto");
  const data = await response.json();
  return data.data || data;
};

// --- DELETE: Eliminar un producto ---
export const deleteProduct = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/api/products/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Error al eliminar el producto");
};
