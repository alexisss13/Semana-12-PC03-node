// src/routes/products.routes.js
import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/products.controller.js';

const router = Router();

// Ruta base: /api/products

// GET /api/products (Listar todos)
// POST /api/products (Crear uno)
router.route('/')
  .get(getAllProducts)
  .post(createProduct);

// GET /api/products/:id (Ver uno)
// PUT /api/products/:id (Actualizar uno)
// DELETE /api/products/:id (Eliminar uno)
router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;