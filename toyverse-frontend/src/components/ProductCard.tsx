import { Product } from '@/types/product';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

// --- Iconos de edición y eliminación ---
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21
      c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25
      2.25 0 01-2.244 2.077H8.084a2.25 2.25 0
      01-2.244-2.077L4.772 5.79m14.456
      0a48.108 48.108 0 00-3.478-.397m-12.54
      0c-.275.042-.547.09-.81.145M5.25
      5.79m0 0a.563.563 0
      01.563-.563h8.125a.563.563 0
      01.563.563m-9.25 0v.006m9.25 0v.006"
    />
  </svg>
);

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  isAdmin?: boolean; // 👈 NUEVA PROP
}

const ProductCard = ({ product, onEdit, onDelete, isAdmin = false }: ProductCardProps) => {
  const { addToCart } = useCart();
  const isOutOfStock = product.stock <= 0; // Para el estado "AGOTADO"

  return (
    <div className="overflow-hidden rounded-lg bg-toyverse-white shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Imagen */}
      <div className="relative h-60 w-full">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          style={{ objectFit: 'cover' }}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
          className="rounded-t-lg"
        />
      </div>

      {/* Contenido */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-toyverse-deep-blue">{product.name}</h3>
        <p className="mt-2 h-20 text-sm text-gray-600 overflow-hidden text-ellipsis">
          {product.description}
        </p>

        {/* Detalles (Precio y Stock) */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-toyverse-orange">
            ${Number(product.price).toFixed(2)}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isOutOfStock
                ? 'bg-red-100 text-red-600'
                : 'bg-toyverse-blue/20 text-toyverse-blue'
            }`}
          >
            Stock: {isOutOfStock ? 'AGOTADO' : product.stock}
          </span>
        </div>

        {/* Acciones */}
        <div className="mt-6">
          {/* MODO CLIENTE */}
          {!isAdmin && (
            <button
              onClick={() => addToCart(product)}
              disabled={isOutOfStock}
              className="w-full rounded-lg bg-toyverse-yellow px-5 py-2.5 text-sm font-semibold text-toyverse-deep-blue shadow-md transition-all hover:bg-toyverse-orange hover:text-white disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed"
            >
              {isOutOfStock ? 'Agotado' : 'Añadir al Carrito'}
            </button>
          )}

          {/* MODO ADMIN */}
          {isAdmin && (
            <div className="flex justify-end gap-3 border-t pt-3 border-gray-100">
              <button
                onClick={() => onEdit(product)}
                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-toyverse-yellow/50 hover:text-toyverse-deep-blue"
                title="Editar"
              >
                <EditIcon />
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-red-100 hover:text-red-600"
                title="Eliminar"
              >
                <DeleteIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
