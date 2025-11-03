import { Product, ProductDTO } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// --- GET ALL: Obtener todos los productos ---
export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/api/products`);
  if (!response.ok) throw new Error("Error al obtener los productos");

  const data = await response.json();
  console.log("🔎 Respuesta cruda del backend:", data);

  if (Array.isArray(data)) {
    return data;
  } else if (Array.isArray(data.data)) {
    return data.data;
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
  return data.data || data;
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

// -----------------------------------------------------------
// 🛒 NUEVO: Procesar checkout y disminuir stock
// -----------------------------------------------------------

// Tipo auxiliar para representar los ítems del carrito
export interface CheckoutItem {
  id: number;
  quantity: number;
}

// --- POST: Procesar la compra y disminuir stock ---
// (Simulación, ya que el backend no tiene /checkout)
export const processCheckout = async (items: CheckoutItem[]): Promise<void> => {
  for (const item of items) {
    const productUrl = `${API_URL}/api/products/${item.id}`;

    // 1️⃣ Obtenemos el producto actual para verificar stock
    let response = await fetch(productUrl);
    if (!response.ok) {
      throw new Error(`Error al obtener stock del producto ${item.id}`);
    }

    const currentData = await response.json();
    const currentProduct = currentData.data || currentData;

    const newStock = currentProduct.stock - item.quantity;
    if (newStock < 0) {
      throw new Error(`Stock insuficiente para el producto ${currentProduct.name}`);
    }

    // 2️⃣ Actualizamos el stock
    response = await fetch(productUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock: newStock }),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar stock del producto ${currentProduct.name}`);
    }
  }

  console.log("✅ Checkout procesado exitosamente, stock actualizado.");
};
