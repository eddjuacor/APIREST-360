import { Router } from "express";
import { 
    obtenerRoles,
    obtenerRol,
    crearRol,
    actualizarRol,

 } from "../controllers/rol.controller.js";

import { authenticateToken, authorizeRole } from "../middleware/authenticateToken.js";

const router = Router();


//endpoints Rol
//Roles 1.Admin 2.Operador 3.Cliente
//enpoint   //middlewares  //metodo en el controlador
router.get("/Rol", authenticateToken, authorizeRole([1,2]), obtenerRoles);
router.get("/Rol/:idRol", authorizeRole([1,2]), obtenerRol);
router.post("/Rol", authorizeRole([1,2]), crearRol);
router.put("/Rol/:idRol", authorizeRole([1,2]), actualizarRol);


export default router;