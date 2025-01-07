//importar express
import express from "express"
import cors from 'cors'
//importar los routes
import productosRoutes from './routes/productos.routes.js'
import rolRoutes from './routes/rol.routes.js'
import estadoRoutes from './routes/estado.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import categoriaProductos from './routes/categoriaProductos.routes.js'
import Cliente from './routes/cliente.routes.js'
import OrdenDetalle from './routes/ordenDetalle.routes.js'
import loginUsuario from './routes/login.routes.js'

import path from 'path';
import { fileURLToPath } from 'url';

// Define __filename y __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//inicializar express en app
const app = express()

//inicializar cors
app.use(cors())

//configurando express para recibir informacion desde el cliente
app.use(express.json())

// Ruta absoluta para la carpeta 'uploads'
const uploadsPath = path.join(__dirname, 'uploads');

// Servir la carpeta 'uploads' como recurso estático
app.use('/producto', express.static(uploadsPath));

//utilizando el router de productos
app.use(productosRoutes);
app.use(rolRoutes);
app.use(estadoRoutes);
app.use(usuariosRoutes);
app.use(categoriaProductos);
app.use(Cliente);
app.use(OrdenDetalle)

app.use(loginUsuario);

//exportar app para que lo utilice index
export default app



