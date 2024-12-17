import { Router } from "express";
import {
    obtenerOrdenesConDetalle,
    obtenerOrdenConDetalle,
    crearOrdenDetalle,
    actualizarOrdenConDetalles,

} from '../controllers/ordenDetalle.controller.js'

import { authenticateToken, authorizeRole } from "../middleware/authenticateToken.js";

const router = Router();

//endpoinst
//Roles 1.Admin 2.Operador 3.Cliente
//enpoint   //middlewares  //metodo en el controlador
router.get("/ordenDetalle", authenticateToken, authorizeRole([1,2]), obtenerOrdenesConDetalle);
router.get("/ordenDetalle/:idOrden", authenticateToken, authorizeRole([1,2]), obtenerOrdenConDetalle),
router.post("/ordenDetalle/", authenticateToken, authorizeRole([1,2]), crearOrdenDetalle);
router.put("/ordenDetalle/:idOrden", authenticateToken, authorizeRole([1,2]), actualizarOrdenConDetalles);


export default router;