import { Router } from "express";
import {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  subirArchivo,
} from "../controllers/productos.controller.js";


import { authenticateToken, authorizeRole } from "../middleware/authenticateToken.js";

//inicializando el router
const router = Router();


router.get("/Producto", obtenerProductos);
router.get("/Producto/:idProductos", obtenerProducto);
router.post("/Producto", authenticateToken, authorizeRole([1, 2]), subirArchivo, crearProducto);

router.put("/Producto/:idProductos", authenticateToken, authorizeRole([1,2]), subirArchivo, actualizarProducto);

export default router;
