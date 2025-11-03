// src/controllers/products.controller.js
import pool from '../config/db.js';
import { getRandomImage } from '../services/externalAPI.service.js';
import { createProductSchema, updateProductSchema } from '../validators/product.validator.js';

// Helper para manejar los errores de Joi de forma limpia
const handleValidationError = (schema, body) => {
  const { error } = schema.validate(body, { abortEarly: false });
  if (error) {
    const validationError = new Error('Error de validación');
    validationError.statusCode = 400;
    // Mapeamos los errores para que el cliente sepa qué falló
    validationError.details = error.details.map(d => d.message);
    throw validationError;
  }
};

// @desc    Listar todos los productos
// @route   GET /api/products
export const getAllProducts = async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    res.json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    next(error); // Pasa el error a nuestro errorHandler
  }
};

// @desc    Obtener un producto por ID
// @route   GET /api/products/:id
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

    if (rows.length === 0) {
      const error = new Error('Producto no encontrado');
      error.statusCode = 404;
      return next(error);
    }

    res.json({ success: true, data: rows[0] });
  } catch (error) {
    next(error);
  }
};

// @desc    Crear un nuevo producto
// @route   POST /api/products
export const createProduct = async (req, res, next) => {
  try {
    // 1. Validar la entrada
    handleValidationError(createProductSchema, req.body);
    
    const { name, description, price, stock } = req.body;

    // 2. Obtener imagen de la API externa
    const imageUrl = await getRandomImage();

    // 3. Insertar en la DB
    const query = `
      INSERT INTO products (name, description, price, stock, image_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *; 
    `;
    // RETURNING * nos devuelve el producto recién creado
    const { rows } = await pool.query(query, [name, description, price, stock, imageUrl]);

    res.status(201).json({ success: true, data: rows[0] });
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar un producto
// @route   PUT /api/products/:id
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // 1. Validar la entrada
    handleValidationError(updateProductSchema, req.body);

    const { name, description, price, stock, image_url } = req.body;

    // 2. Traer el producto actual para saber qué actualizar
    const { rows: currentProductRows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

    if (currentProductRows.length === 0) {
      const error = new Error('Producto no encontrado');
      error.statusCode = 404;
      return next(error);
    }

    const current = currentProductRows[0];

    // 3. Preparamos la actualización (usamos el valor nuevo o el antiguo si no se proveyó)
    const updatedProduct = {
      name: name || current.name,
      description: description || current.description,
      price: price || current.price,
      stock: stock !== undefined ? stock : current.stock, // stock puede ser 0
      image_url: image_url || current.image_url,
    };

    // 4. Ejecutar la actualización
    const query = `
      UPDATE products
      SET name = $1, description = $2, price = $3, stock = $4, image_url = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *;
    `;
    
    const { rows } = await pool.query(query, [
      updatedProduct.name,
      updatedProduct.description,
      updatedProduct.price,
      updatedProduct.stock,
      updatedProduct.image_url,
      id
    ]);

    res.json({ success: true, data: rows[0] });
  } catch (error) {
    next(error);
  }
};

// @desc    Eliminar un producto
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Usamos RETURNING * para saber si realmente se borró algo
    const { rows } = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

    if (rows.length === 0) {
      const error = new Error('Producto no encontrado');
      error.statusCode = 404;
      return next(error);
    }
    
    // Devolvemos 204 (No Content) o un 200 con el item borrado.
    // Prefiero el 200 para que el frontend confirme qué se borró.
    res.json({ 
      success: true, 
      message: 'Producto eliminado exitosamente',
      data: rows[0]
    });
  } catch (error) {
    next(error);
  }
};