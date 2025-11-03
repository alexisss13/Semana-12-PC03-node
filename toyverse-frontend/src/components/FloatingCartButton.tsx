// src/components/FloatingCartButton.tsx
'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import CartModal from './CartModal';

const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.023.837l.542 3.518c.074.475-.24 1.018-.727 1.018H18.75a1.875 1.875 0 001.875-1.875V6.75A2.25 2.25 0 0018.75 4.5H5.82C5.308 4.5 4.863 4.157 4.795 3.663L4.17 1.685C4.103 1.258 3.722 1.02 3.328 1.02H2.25V3zm2.5 16.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.75 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
    />
  </svg>
);

const FloatingCartButton = () => {
  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Clase dinámica para el efecto de "sacudida" o "impulso" al añadir un ítem
  // La clave es que esta clase se aplique solo por un corto tiempo.
  const shakeClass = totalItems > 0 ? 'animate-bounce-once' : ''; // Implementaremos 'animate-bounce-once' en globals.css/tailwind.config

  return (
    <>
      <button
        onClick={() => setIsCartOpen(true)}
        className={`
          fixed bottom-6 right-6 z-40 
          rounded-full bg-toyverse-orange p-4 text-white 
          shadow-xl transition-all duration-300 ease-in-out
          hover:bg-toyverse-deep-blue hover:scale-110 
          focus:outline-none focus:ring-4 focus:ring-toyverse-yellow/50
          ${shakeClass}
        `}
        aria-label={`Ver carrito con ${totalItems} ítems`}
        title={`Ver Carrito (${totalItems} ítems)`}
      >
        <CartIcon />
        
        {/* Contador de ítems */}
        {totalItems > 0 && (
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white ring-2 ring-toyverse-white">
            {totalItems}
          </span>
        )}
      </button>

      {/* Modal del Carrito */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default FloatingCartButton;