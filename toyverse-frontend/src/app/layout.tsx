import type { Metadata } from 'next'
// Importamos la fuente
import { Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar' // Crearemos este componente

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
      {/* Aplicamos la fuente a todo el body */}
      <body className={`${poppins.className} bg-gray-50 text-toyverse-deep-blue`}>
        <Navbar />
        <main className="container mx-auto max-w-7xl px-4 py-8">
          {children}
        </main>
        {/* Aquí podría ir un Footer también */}
      </body>
    </html>
  )
}