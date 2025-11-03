import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="w-full bg-toyverse-white shadow-md">
      <div className="container mx-auto flex max-w-7xl items-center justify-between p-4">
        {/* Logo y Nombre */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🧸</span>
          <h1 className="text-2xl font-bold text-toyverse-deep-blue">
            ToyVerse
          </h1>
        </Link>
        
        {/* Eslogan (opcional) */}
        <p className="hidden text-sm text-toyverse-orange md:block">
          ✨ Explora, juega y descubre tu mundo.
        </p>
      </div>
    </nav>
  );
};

export default Navbar;