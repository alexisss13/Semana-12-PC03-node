'use client';

import { Product, ProductDTO } from '@/types/product';
import { useState, useEffect } from 'react';

interface ProductFormProps {
  // Función que se ejecuta al enviar el formulario
  onSubmit: (data: ProductDTO) => Promise<void>; 
  // Datos iniciales (para modo edición)
  initialData?: Product | null;
  // Texto del botón de envío
  submitButtonText?: string;
}

const ProductForm = ({ 
  onSubmit, 
  initialData, 
  submitButtonText = "Guardar" 
}: ProductFormProps) => {
  const [formData, setFormData] = useState<ProductDTO>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Si recibimos 'initialData', poblamos el formulario
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        price: initialData.price,
        stock: initialData.stock,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      // Convertimos a número si es precio o stock
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error(error);
      alert('Hubo un error al guardar el producto.');
    } finally {
      setIsLoading(false);
    }
  };

  // Estilo base para los inputs
  const inputStyle = "w-full rounded-md border border-gray-300 p-2 focus:border-toyverse-blue focus:ring-toyverse-blue";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className={inputStyle}
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          name="description"
          id="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className={inputStyle}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
          <input
            type="number"
            name="price"
            id="price"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handleChange}
            className={inputStyle}
            required
          />
        </div>
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            id="stock"
            min="0"
            value={formData.stock}
            onChange={handleChange}
            className={inputStyle}
            required
          />
        </div>
      </div>
      
      <button 
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-toyverse-orange px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-toyverse-deep-blue disabled:opacity-50"
      >
        {isLoading ? 'Guardando...' : submitButtonText}
      </button>
    </form>
  );
};

export default ProductForm;