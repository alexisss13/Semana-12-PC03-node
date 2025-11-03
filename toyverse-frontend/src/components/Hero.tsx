import React from 'react';
import Link from 'next/link';
const BACKGROUND_IMAGE_URL = 'https://media.istockphoto.com/id/1499053648/es/foto/perchero-para-ni%C3%B1os-en-la-tienda.jpg?s=612x612&w=0&k=20&c=pKQmELZGFAYNhzhRCqPLS8brgDDn-fACudJk8fnQRAQ=';

const Hero = () => {
  return (
// 1. Clases de fondo: bg-cover, bg-center, y la URL directa. 
    // 2. Padding grande para darle presencia (py-24).
    <div 
      className="py-16 md:py-24 rounded-xl shadow-2xl mb-12 bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }}
    >
      
      {/* Capa de Oscurecimiento/Contraste (Overlay) */}
      {/* Usamos un color de marca (deep-blue) con opacidad para asegurar la legibilidad del texto blanco */}
      <div className="absolute inset-0 bg-toyverse-deep-blue/80 rounded-xl"></div>
      
      {/* Contenido del Héroe */}
      <div className="container mx-auto max-w-5xl px-4 text-center relative z-10 text-toyverse-white">
        
        {/* Icono Principal (reducimos los iconos, solo el oso) */}
        <span className="text-5xl md:text-7xl mb-4 block">🧸</span>
        
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          ¡Bienvenido al ToyVerse!
        </h1>
        
        {/* Eslogan (reducimos los iconos, solo el texto) */}
        <p className="text-xl md:text-2xl font-light mb-8">
          Explora, juega y descubre tu mundo en ToyVerse.
        </p>
        
        {/* Call to Action (Ir al Catálogo) */}
        <Link 
          href="#catalogo" 
          className="inline-block bg-toyverse-yellow text-toyverse-deep-blue text-lg font-bold px-8 py-3 rounded-full shadow-xl transition-all duration-300 hover:bg-toyverse-orange hover:text-white transform hover:scale-105"
        >
          ¡Comienza a Explorar! 🚀
        </Link>
      </div>
    </div>
  );
};

// Componente para destacar la promesa de la marca
const BrandPromise = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
    
    {/* Promesa 1: Confianza */}
    <div className="text-center p-4 bg-white rounded-lg shadow-md border-t-4 border-toyverse-blue">
      <span className="text-4xl mb-3 block">🔒</span>
      <h3 className="text-xl font-semibold text-toyverse-deep-blue mb-2">Compra Confiable</h3>
      <p className="text-gray-600 text-sm">Transacciones seguras y soporte siempre disponible.</p>
    </div>

    {/* Promesa 2: Diversión */}
    <div className="text-center p-4 bg-white rounded-lg shadow-md border-t-4 border-toyverse-yellow">
      <span className="text-4xl mb-3 block">🚀</span>
      <h3 className="text-xl font-semibold text-toyverse-deep-blue mb-2">Máxima Diversión</h3>
      <p className="text-gray-600 text-sm">Juguetes seleccionados para despertar la creatividad.</p>
    </div>

    {/* Promesa 3: Calidez */}
    <div className="text-center p-4 bg-white rounded-lg shadow-md border-t-4 border-toyverse-orange">
      <span className="text-4xl mb-3 block">🎁</span>
      <h3 className="text-xl font-semibold text-toyverse-deep-blue mb-2">El Regalo Perfecto</h3>
      <p className="text-gray-600 text-sm">Un lugar donde cada juguete tiene una historia que contar.</p>
    </div>
  </div>
);


const HomeContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Hero />
      <BrandPromise />
      
      {/* Sección del Catálogo (que viene de page.tsx) */}
      <section id="catalogo" className="pt-10">
        <h2 className="text-4xl font-extrabold text-toyverse-deep-blue mb-8 text-center border-b pb-3">
          Catálogo Destacado
        </h2>
        {children}
      </section>
    </>
  );
};

export default HomeContent;