// toyverse-frontend/src/app/admin/page.tsx
'use client'; 

import { useState, useEffect } from 'react';
import { Product, ProductDTO } from '@/types/product';
import * as api from '@/services/api'; 

import ProductCard from '@/components/ProductCard';
import Modal from '@/components/Modal';
import ProductForm from '@/components/ProductForm';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null); 

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('❌ Error al cargar productos:', error);
      alert('Error al cargar los productos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleFormSubmit = async (data: ProductDTO) => {
    try {
      if (modalMode === 'create') {
        await api.createProduct(data);
      } else if (currentProduct) {
        await api.updateProduct(currentProduct.id, data);
      }

      closeModal();
      await fetchProducts();

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

  // --- RENDERIZADO DEL PANEL DE ADMIN ---
  return (
    <div className="min-h-screen">
      <div className="mb-8 flex items-center justify-between border-b pb-4">
        <h2 className="text-3xl font-bold text-toyverse-deep-blue">Panel de Administración ⚙️</h2>
        <button
          onClick={openCreateModal}
          className="rounded-lg bg-toyverse-orange px-5 py-2.5 font-semibold text-white shadow-sm transition-all hover:scale-105 hover:shadow-md"
        >
          + Nuevo Producto
        </button>
      </div>

      {isLoading ? (
        <p className="text-center py-10">Cargando datos de administración... ⏳</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              onEdit={openEditModal}
              onDelete={handleDelete}
              // Pasamos una prop para indicar que estamos en modo Admin
              isAdmin={true} 
            />
          ))}
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        title={modalMode === 'create' ? 'Añadir Nuevo Juguete' : `Editar ${currentProduct?.name || 'Producto'}`}
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