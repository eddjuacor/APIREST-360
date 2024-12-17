import { Router } from "express";
import {
    obtenerEstados,
    obtenerEstado,
    crearEstado,
    actualizarEstado,
   

} from '../controllers/estado.controller.js'

import { authenticateToken, authorizeRole } from "../middleware/authenticateToken.js";

const router = Router();

//endpoinst estado

//Roles 1.Admin 2.Operador 3.Cliente
//enpoint   //middlewares  //metodo en el controlador
router.get("/Estado", authenticateToken, authorizeRole([1,2]), obtenerEstados);
router.get("/Estado/:idEstados", authenticateToken, authorizeRole([1,2]), obtenerEstado),
router.post("/Estado/", authenticateToken, authorizeRole([1,2]), crearEstado);
router.put("/Estado/:idEstados", authenticateToken, authorizeRole([1,2]), actualizarEstado);


export default router;