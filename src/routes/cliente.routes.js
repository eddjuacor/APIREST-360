import { Router } from "express";
import {
    obtenerClientes,
    obtenerCliente,
    crearCliente,
    actualizarCliente,
  

} from '../controllers/cliente.controller.js'

import { authenticateToken, authorizeRole } from "../middleware/authenticateToken.js";

const router = Router();

//endpoinst
//Roles 1.Admin 2.Operador 3.Cliente
//enpoint   //middlewares  //metodo en el controlador
router.get("/Cliente", authenticateToken, authorizeRole([1,2]), obtenerClientes);
router.get("/Cliente/:id", authenticateToken, authorizeRole([1,2]), obtenerCliente),
router.post("/Cliente/", authenticateToken, authorizeRole([1,2]), crearCliente);
router.put("/Cliente/:id", authenticateToken, authorizeRole([1,2]), actualizarCliente);


export default router;