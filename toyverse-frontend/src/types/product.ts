// Define la estructura de un Producto
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
}

// Define el tipo de dato para crear/actualizar un producto
// Omitimos 'id' y 'image_url' porque el backend los gestiona
export type ProductDTO = Omit<Product, 'id' | 'image_url'>;

export interface CartItem extends Product {
  quantity: number; // Cantidad de este producto en el carrito
}