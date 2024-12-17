import { Router } from "express";
import {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,

} from "../controllers/productos.controller.js";

import { authenticateToken, authorizeRole } from "../middleware/authenticateToken.js";

//inicializando el router
const router = Router();

//endpoinst
//Roles 1.Admin 2.Operador 3.Cliente
//enpoint   //middlewares  //metodo en el controlador
router.get("/Producto",  obtenerProductos);
router.get("/Producto/:idProductos", obtenerProducto);
router.post("/Producto", authenticateToken, authorizeRole([1,2]), crearProducto);
router.put("/Producto/:idProductos", authenticateToken, authorizeRole([1,2]), actualizarProducto);




export default router;
