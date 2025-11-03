markdown<div align="center">
<h1>🧸 ToyVerse — Backend API</h1>
<strong>✨ Explora, juega y descubre tu mundo en ToyVerse. ✨</strong>
<p>Backend oficial de la tienda online de juguetes ToyVerse, construido con Node.js, Express y PostgreSQL.</p>
</div>

---

## 🌐 API Desplegada

La API de producción está desplegada en Render y disponible en la siguiente URL:

**URL Base:** `https://TU-URL-DE-RENDER.onrender.com`

> ⚠️ (Reemplaza la URL de arriba con la que te proporcionó Render)

---

## 🛠️ Stack Tecnológico

- **Runtime:** Node.js
- **Framework:** Express.js
- **Base de Datos:** PostgreSQL (alojada en Render)
- **Validación:** Joi
- **Logging:** Morgan
- **Variables de Entorno:** Dotenv
- **Cliente HTTP:** Axios (para consumir API externa de imágenes)

---

## 🏃‍♂️ Instalación y Ejecución Local

Sigue estos pasos para correr el proyecto en tu máquina local.

### 1. Clonar el repositorio
```bash
git clone https://github.com/alexisss13/Semana-12-PC03-node.git
cd Semana-12-PC03-node
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto y añade tu cadena de conexión a la base de datos de PostgreSQL. (Puedes usar la misma de Render para desarrollo si lo deseas).
```ini
# .env
DATABASE_URL="postgresql://USUARIO:PASSWORD@HOST/BASE_DE_DATOS"
```

### 4. Correr la migración (crear la tabla)

Ejecuta el siguiente comando SQL en tu base de datos (usando `psql`, DBeaver, o el "Shell" de Render) para crear la tabla `products`:
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

### 5. Iniciar el servidor de desarrollo

El servidor se iniciará con `nodemon` en `http://localhost:3000`.
```bash
npm run dev
```

---

## 📦 Endpoints de la API

La API sigue una arquitectura RESTful para la gestión de productos.

### 1. Obtener todos los productos

- **Método:** `GET`
- **Endpoint:** `/api/products`
- **Ejemplo (curl):**
```bash
curl -X GET https://TU-URL-DE-RENDER.onrender.com/api/products
```

- **Respuesta (JSON):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "name": "Osito de Peluche Clásico",
      "description": "Un compañero suave y tierno",
      "price": "24.99",
      "stock": 50,
      "image_url": "https://picsum.photos/id/237/400/400",
      "created_at": "2025-11-03T19:30:00.000Z",
      "updated_at": "2025-11-03T19:30:00.000Z"
    }
  ]
}
```

### 2. Obtener un producto por ID

- **Método:** `GET`
- **Endpoint:** `/api/products/:id`
- **Ejemplo (curl):**
```bash
curl -X GET https://TU-URL-DE-RENDER.onrender.com/api/products/1
```

### 3. Crear un nuevo producto

- **Método:** `POST`
- **Endpoint:** `/api/products`
- **Body (JSON):**
```json
{
  "name": "Cubo Rubik 3x3",
  "description": "Clásico rompecabezas de colores",
  "price": 12.50,
  "stock": 100
}
```

- **Ejemplo (curl):**
```bash
curl -X POST https://TU-URL-DE-RENDER.onrender.com/api/products \
-H "Content-Type: application/json" \
-d '{"name": "Cubo Rubik 3x3", "description": "Clásico rompecabezas", "price": 12.50, "stock": 100}'
```

> 📝 **Nota:** La `image_url` se genera automáticamente desde una API externa (Picsum Photos) al crear el producto.

### 4. Actualizar un producto

- **Método:** `PUT`
- **Endpoint:** `/api/products/:id`
- **Body (JSON):** (Solo incluye los campos a actualizar)
```json
{
  "price": 10.99,
  "stock": 90
}
```

### 5. Eliminar un producto

- **Método:** `DELETE`
- **Endpoint:** `/api/products/:id`
- **Ejemplo (curl):**
```bash
curl -X DELETE https://TU-URL-DE-RENDER.onrender.com/api/products/1
```

---

## 📸 Capturas de Pantalla (Ejemplos)


**Ejemplo de Respuesta POST en ThunderClient:**  
![ejemplo](image.png)

---

<div align="center">
<p>Hecho con ❤️ para ToyVerse</p>
</div>