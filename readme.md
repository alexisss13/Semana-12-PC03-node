# 🧸 ToyVerse — E-commerce Conversacional API & Frontend

✨ **Explora, juega y descubre tu mundo en ToyVerse.** ✨

Este repositorio contiene la solución completa para una tienda online de juguetes, implementando una API RESTful para la gestión de productos (CRUD) y un moderno frontend en Next.js con un flujo de Comercio Conversacional (Chat-to-Sale).

---


https://github.com/user-attachments/assets/d331fc61-7899-4696-a938-845b61d1c9ad


https://github.com/user-attachments/assets/f0ac3c58-af89-43f1-bc00-6feb6d7fc452


https://github.com/user-attachments/assets/ea258606-9a6a-4754-8cfd-6dbb2a1858e5



## 🌐 Enlaces de Despliegue (Deploy)

| Proyecto | Hosting | URL |
|----------|---------|-----|
| Backend API (Node.js/Express) | Render | https://semana-12-pc03-node.onrender.com |
| Frontend Web (Next.js/React) | Vercel | https://toyverse-git-main-alexisss13-proyectos.vercel.app?_vercel_share=PBjSUaZLu6ATu7waudFJDyYwHp7yJRTh |

---

## 🛠️ Stack Tecnológico

| Componente | Backend (API) | Frontend (Web) |
|------------|---------------|----------------|
| **Runtime** | Node.js | Node.js (con TypeScript) |
| **Framework** | Express.js | Next.js (App Router) |
| **Estilos** | — | Tailwind CSS |
| **Gestión de Estado** | — | React Context (Carrito y Toast) |
| **Base de Datos** | PostgreSQL (Render) | — |
| **Imágenes** | Axios (Consumo de Picsum Photos) | Next/Image |
| **Utilidades** | Joi (Validación), Morgan (Logging) | Axios (Servicios API) |

---

## 📂 Estructura del Repositorio

El repositorio está organizado para alojar tanto el backend como el frontend.
```
toyverse-repo/
├── toyverse-frontend/         # Proyecto Next.js (React, TypeScript, Tailwind)
│   ├── src/
│   ├── public/
│   ├── next.config.ts
│   └── package.json
├── src/                       # Proyecto Backend (Express)
│   ├── config/ (DB)
│   ├── controllers/ (CRUD Logic)
│   ├── middlewares/ (Logger, ErrorHandler)
│   ├── routes/ (API Endpoints)
│   └── app.js (Main App)
├── package.json               # (del Backend)
└── README.md                  # (Este archivo)
```

---

## 🏃‍♂️ I. Instrucciones: Backend (API)

El backend expone los endpoints CRUD para la gestión del catálogo.

### A. Instalación Local

1. **Clonar el repositorio y entrar en la carpeta del Backend:**
```bash
   git clone https://github.com/alexisss13/Semana-12-PC03-node.git
   cd Semana-12-PC03-node
```

2. **Instalar dependencias del Backend:**
```bash
   npm install
```

3. **Configurar `.env`:** Crear un archivo `.env` en la raíz con la conexión a tu DB (PostgreSQL).
```env
   # .env
   DATABASE_URL="la_url_de_tu_dabase"
   PORT=3000
```

4. **Crear la tabla `products`:** Ejecutar el siguiente script SQL en tu base de datos:
```sql
   CREATE TABLE products (
       id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       description TEXT,
       price DECIMAL(10, 2) NOT NULL,
       stock INTEGER DEFAULT 0,
       image_url VARCHAR(512),
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
```

5. **Iniciar el servidor:**
```bash
   npm run dev
```

### B. Endpoints CRUD (Ejemplos)

La URL base es `https://semana-12-pc03-node.onrender.com/api/products`.

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/products` | Listar todos los productos. |
| GET | `/api/products/:id` | Obtener un producto específico. |
| POST | `/api/products` | Crear un nuevo producto (la imagen se genera automáticamente con Axios/Picsum Photos). |
| PUT | `/api/products/:id` | Actualizar stock, precio, o descripción. |
| DELETE | `/api/products/:id` | Eliminar un producto. |

---

## 🏃‍♂️ II. Instrucciones: Frontend (Web)

El frontend es el portal de la tienda y el panel de administración.

### A. Instalación Local

1. **Entrar en la carpeta del Frontend:**
```bash
   cd toyverse-frontend
```

2. **Instalar dependencias del Frontend:**
```bash
   npm install
```

3. **Configurar `.env.local`:** Crea este archivo en la carpeta `toyverse-frontend/` para apuntar al API desplegado (Render).
```env
   # toyverse-frontend/.env.local
   NEXT_PUBLIC_API_URL="la_url_de_tu_backend_desplegado"
```

4. **Iniciar el servidor de desarrollo:**
```bash
   npm run dev
```

### B. Características de E-commerce

- **Página Principal (/):** Landing Page profesional con información de marca, hero con imagen de fondo, y el catálogo de productos.

- **Carrito Flotante (FAB):** Un botón flotante (`bg-toyverse-orange`) siempre visible permite al usuario ver y gestionar su carrito (implementado en `FloatingCartButton.tsx`).

- **Notificación de Compra:** Al añadir un producto, se activa una notificación (Toast) para confirmar la acción.

- **Comercio Conversacional:** Al "Confirmar Pedido" en el carrito, la aplicación:
  - **NO** modifica el stock del backend.
  - Genera un enlace de WhatsApp dirigido al vendedor (+51 955 101 753) con los detalles completos del pedido, listo para enviar.

- **Panel de Admin (/admin):** Página separada para realizar las operaciones CRUD (Crear, Editar, Eliminar productos), lo que simula la gestión manual del stock por parte del vendedor.

---

## 📸 Captura de Diseño Final (Concepto)
<img width="1851" height="826" alt="image" src="https://github.com/user-attachments/assets/acb07bdb-6f49-43c2-b68a-e48674c247a2" />
<img width="1857" height="673" alt="image" src="https://github.com/user-attachments/assets/fab6c4c7-7b0e-4730-a017-1a06d7184544" />
<img width="1858" height="916" alt="image" src="https://github.com/user-attachments/assets/2fc08b4d-2c14-4ff4-b823-ad9df5e22e72" />
<img width="1852" height="918" alt="image" src="https://github.com/user-attachments/assets/99b1025e-2172-46a4-9f46-8a68bcd56b38" />
<img width="1857" height="921" alt="image" src="https://github.com/user-attachments/assets/03a7cad5-6935-4efc-aae7-5002bba010e9" />
<img width="1859" height="924" alt="image" src="https://github.com/user-attachments/assets/cc639e54-627d-4ed3-b10a-73d1655a794e" />



| Elemento | Descripción |
|----------|-------------|
| **Landing Hero** | Banner con fondo temático, texto centrado, y colores `toyverse-blue`/`toyverse-yellow` |
| **Catálogo** | Tarjetas de producto con diseño limpio, precio en `toyverse-orange` y botón Añadir al Carrito (`toyverse-yellow`). |
| **Carrito Flotante** | Botón circular pegado a la esquina inferior derecha. |
| **Panel Admin** | Pantalla similar al catálogo, pero con botones de Editar y Eliminar visibles en cada tarjeta (solo disponible en la ruta `/admin`). |

