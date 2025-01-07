import { Router } from "express";
import {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,

} from "../controllers/categoriaProductos.controller.js";


import { authenticateToken, authorizeRole } from "../middleware/authenticateToken.js";

//inicializando el router
const router = Router();

//creando los endpoinst
//endpoints productos
//Roles 1.Admin 2.Operador 3.Cliente
//enpoint   //middlewares  //metodo en el controlador
router.get("/CategoriasProducto", authenticateToken, authorizeRole([1,2]), obtenerCategorias);
router.get("/CategoriaProducto/:idCategoriaProductos", authenticateToken, authorizeRole([1,2]), obtenerCategoria);
router.post("/CategoriaProducto",  authenticateToken, authorizeRole([1,2]), crearCategoria);
router.put("/CategoriaProducto/:idCategoriaProductos", authenticateToken, authorizeRole([1,2]), actualizarCategoria);




export default router;
