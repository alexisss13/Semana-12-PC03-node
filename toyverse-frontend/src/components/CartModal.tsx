'use client';

import Modal from './Modal';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { useState } from 'react';

// NÚMERO DEL VENDEDOR (TOYVERSE)
const VENDOR_WHATSAPP_NUMBER = '51955101753'; // 👈 WhatsApp del vendedor

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const { cart, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState(''); // Número del cliente

  const handleQuantityChange = (productId: number, value: string) => {
    const quantity = parseInt(value);
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    updateQuantity(productId, quantity);
  };

  // 🧾 FUNCIÓN SIMPLIFICADA: SOLO NOTIFICACIÓN POR WHATSAPP
  const handleCheckout = () => {
    if (cart.length === 0 || !customerPhoneNumber) {
      alert('⚠️ Por favor, ingresa tu número de WhatsApp para que el vendedor te contacte.');
      return;
    }

    // 1️⃣ Listado de productos
    const itemsList = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toFixed(2)})`
      )
      .join('\n');

    // 2️⃣ Mensaje para el vendedor
    const whatsappMessage =
      `🧸 *NUEVO PEDIDO TOYVERSE PENDIENTE* 🧸\n\n` +
      `📞 *Contacto del Cliente:* +${customerPhoneNumber.replace(/[^0-9]/g, '')}\n\n` +
      `💰 *Total del Pedido:* $${totalPrice.toFixed(2)}\n\n` +
      `📦 *Detalles de la Orden:*\n${itemsList}\n\n---\n` +
      `*Acción:* Vendedor, por favor contactar al cliente para confirmar el stock y el envío.`;

    // 3️⃣ Enlace directo al WhatsApp del vendedor
    const waLink = `https://wa.me/${VENDOR_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    // 4️⃣ Abrir WhatsApp y limpiar carrito
    window.open(waLink, '_blank');
    alert('✅ Pedido preparado. Se abrirá WhatsApp para notificar al vendedor.');
    clearCart();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Mi Pedido ToyVerse (Total: ${totalItems})`}>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          Tu carrito está vacío. ¡Añade algunos juguetes! 🧸
        </p>
      ) : (
        <>
          {/* Lista de ítems del carrito */}
          <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <div className="flex-grow">
                  <p className="font-semibold text-toyverse-deep-blue">{item.name}</p>
                  <p className="text-sm text-gray-600">${Number(item.price).toFixed(2)} c/u</p>
                </div>

                {/* Selector de cantidad */}
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  className="w-16 rounded-md border border-gray-300 text-center text-sm"
                  aria-label="Cantidad"
                />

                {/* Botón eliminar */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Eliminar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Campo para número del cliente */}
          <div className="mt-4">
            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">
              Tu WhatsApp para contacto (Ej: 51987654321)
            </label>
            <input
              type="tel"
              id="whatsapp"
              value={customerPhoneNumber}
              onChange={(e) => setCustomerPhoneNumber(e.target.value)}
              placeholder="51987654321"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-toyverse-blue focus:ring-toyverse-blue"
              required
            />
          </div>

          {/* Resumen y acción */}
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between font-bold text-xl mb-4">
              <p>Total del Pedido:</p>
              <p className="text-toyverse-orange">${totalPrice.toFixed(2)}</p>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full rounded-lg bg-toyverse-orange px-5 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:bg-toyverse-deep-blue"
              disabled={cart.length === 0}
            >
              Confirmar Pedido (Notificar Vendedor)
            </button>

            <p className="mt-2 text-center text-xs text-gray-500">
              Tu pedido se enviará al WhatsApp del vendedor (955101753) para su gestión.  
              El stock se actualizará manualmente.
            </p>

            <button
              onClick={clearCart}
              className="w-full mt-2 text-sm text-gray-500 hover:text-red-500"
            >
              Vaciar Carrito
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default CartModal;
