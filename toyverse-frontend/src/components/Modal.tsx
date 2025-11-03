'use client';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    // Backdrop
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Contenido del Modal */}
      <div
        className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl"
        // Evita que el clic dentro del modal lo cierre
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-xl font-semibold text-toyverse-deep-blue">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Cuerpo */}
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;