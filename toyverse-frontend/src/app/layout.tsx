import type { Metadata } from 'next'
// Importamos la fuente
import { Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { CartProvider } from '@/context/CartContext'
import FloatingCartButton from '@/components/FloatingCartButton' // 👈 NUEVO IMPORT

// Configuración de la fuente
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Pesos que usaremos
})

export const metadata: Metadata = {
  title: '🧸 ToyVerse — Universo de Juguetes',
  description: 'Explora, juega y descubre tu mundo en ToyVerse.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${poppins.className} bg-gray-50 text-toyverse-deep-blue`}>
        <CartProvider>
          {/* Navbar fija arriba */}
          <Navbar />

          {/* Contenido principal */}
          <main className="container mx-auto max-w-7xl px-4 py-8">
            {children}
          </main>

          {/* Botón flotante del carrito (siempre visible) */}
          <FloatingCartButton />
        </CartProvider>
      </body>
    </html>
  )
}
