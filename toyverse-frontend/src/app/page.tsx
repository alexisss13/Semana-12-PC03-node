'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import * as api from '@/services/api';
import ProductCard from '@/components/ProductCard';

// ✅ Nuevo componente hero / contenedor principal
import HomeContent from '@/components/Hero';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🚀 Cargar productos (solo para mostrar, sin CRUD)
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('❌ Error al cargar productos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    // 🏠 HomeContent envuelve todo el catálogo
    <HomeContent>
      {isLoading ? (
        <p className="text-center">Cargando catálogo... 🧸</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              // 👇 Estas funciones se dejan vacías porque no hay CRUD aquí
              onEdit={() => {}}
              onDelete={() => {}}
              isAdmin={false} // ✅ Solo muestra el botón de “Agregar al carrito”
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-10">
          ¡Vuelve pronto! No hay juguetes disponibles. 🪀
        </p>
      )}
    </HomeContent>
  );
}
