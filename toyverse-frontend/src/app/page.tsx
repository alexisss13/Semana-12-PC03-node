'use client'; // Marcamos como Client Component para interactividad

import { useState, useEffect } from 'react';
import { Product, ProductDTO } from '@/types/product';
import * as api from '@/services/api'; // Importamos nuestro servicio de API

import ProductCard from '@/components/ProductCard';
import Modal from '@/components/Modal';
import ProductForm from '@/components/ProductForm';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Estado para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  // Producto que se está editando
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  // --- Función para cargar productos ---
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await api.getProducts();
      console.log('🧩 Respuesta del backend:', data);

      setProducts(data);
    } catch (error) {
      console.error('❌ Error al cargar productos:', error);
      alert('Error al cargar los productos');
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // --- Manejadores de Modal ---
  const openCreateModal = () => {
    setModalMode('create');
    setCurrentProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setModalMode('edit');
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  // --- Manejadores de CRUD ---

  const handleFormSubmit = async (data: ProductDTO) => {
    try {
      if (modalMode === 'create') {
        await api.createProduct(data);
      } else if (currentProduct) {
        await api.updateProduct(currentProduct.id, data);
      }

      closeModal(); // Cierra el modal
      await fetchProducts(); // Recarga la lista de productos
    } catch (error) {
      console.error(error);
      alert('Error al guardar el producto');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await api.deleteProduct(id);
        await fetchProducts();
      } catch (error) {
        console.error(error);
        alert('Error al eliminar el producto');
      }
    }
  };

  return (
    <div>
      {/* Encabezado de la página y Botón de Crear */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Nuestro Universo de Juguetes</h2>
        <button
          onClick={openCreateModal}
          className="rounded-lg bg-toyverse-orange px-5 py-2.5 font-semibold text-white shadow-sm transition-all hover:scale-105 hover:shadow-md"
        >
          + Añadir Juguete
        </button>
      </div>

      {/* Grid de Productos */}
      {isLoading ? (
        <p className="text-center">Cargando juguetes... 🧸</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No hay juguetes disponibles 🪀</p>
      )}

      {/* Modal para Crear/Editar Producto */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalMode === 'create' ? 'Añadir Nuevo Juguete' : 'Editar Juguete'}
      >
        <ProductForm
          onSubmit={handleFormSubmit}
          initialData={currentProduct}
          submitButtonText={modalMode === 'create' ? 'Crear Producto' : 'Actualizar Producto'}
        />
      </Modal>
    </div>
  );
}
