// src/validators/product.validator.js
import Joi from 'joi';

// Esquema para la creación (todos los campos requeridos)
export const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(255).required().messages({
    'string.base': 'El nombre debe ser texto',
    'string.empty': 'El nombre no puede estar vacío',
    'string.min': 'El nombre debe tener al menos 3 caracteres',
    'any.required': 'El nombre es requerido',
  }),
  description: Joi.string().allow('').optional(), // Permite descripción vacía
  price: Joi.number().positive().precision(2).required().messages({
    'number.base': 'El precio debe ser un número',
    'number.positive': 'El precio debe ser un valor positivo',
    'any.required': 'El precio es requerido',
  }),
  stock: Joi.number().integer().min(0).default(0).messages({
    'number.base': 'El stock debe ser un número entero',
    'number.min': 'El stock no puede ser negativo',
  }),
});

// Esquema para la actualización (todos los campos opcionales)
export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(255).optional(),
  description: Joi.string().allow('').optional(),
  price: Joi.number().positive().precision(2).optional(),
  stock: Joi.number().integer().min(0).optional(),
  image_url: Joi.string().uri().optional(), // Permitir actualizar la imagen manualmente
}).min(1); // Requiere que al menos un campo esté presente para actualizar