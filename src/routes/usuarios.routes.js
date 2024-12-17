import { Router } from "express";
import {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
  
} from "../controllers/usuarios.controller.js";

import { authenticateToken, authorizeRole } from "../middleware/authenticateToken.js";

//inicializando el router
const router = Router();

//creando los endpoinst
//Roles 1.Admin 2.Operador 3.Cliente
//enpoint   //middlewares  //metodo en el controlador
router.get("/Usuario", authenticateToken, authorizeRole([1,2]), obtenerUsuarios);
router.get("/Usuario/:idUsuarios", authenticateToken, authorizeRole([1,2]), obtenerUsuario);
router.post("/Usuario", crearUsuario);
router.put("/Usuario/:idUsuarios", actualizarUsuario);




export default router;
