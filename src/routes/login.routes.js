import { Router } from "express";
import {loginUsuario} from '../auth/loginUsuario.js';

const router = Router();

//endpoinst

router.post("/login", loginUsuario);


export default router;