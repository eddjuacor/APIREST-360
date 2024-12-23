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

//inicializar express en app
const app = express()

//inicializar cors
app.use(cors())

//configurando express para recibir informacion desde el cliente
app.use(express.json())

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



