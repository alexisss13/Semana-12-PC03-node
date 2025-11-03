// src/config/db.js
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false, // 🔒 necesario para Render
  },
});

pool.connect()
  .then(() => console.log('✅ Conectado a PostgreSQL con éxito'))
  .catch(err => console.error('❌ Error al conectar a la base de datos:', err.message));

export default pool;
