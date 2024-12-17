import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next)=>{
    //en el encabezdo esta el token
    const authHeader = req.headers['authorization']
    //dejando solo el token si espacion y otros titulos
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({message: 'Token no proporcionado'})
    }

    try {
        //verificando que el token sea valido
        const decoded = jwt.verify(token, process.env.SECRET)

        //asisgnando el token verificado al req
        req.user = decoded

        next()
    } catch (error) {
        return res.status(403).json({message: 'Token invalido o expirado'})
    }
}

export const authorizeRole = (rolesPermitidos) =>{
    return (req, res, next)=>{
        const {rol} = req.user;

        if(!rolesPermitidos.includes(rol)){
            return res.status(403).json({ message: 'Acceso denegado: No tienes permisos'})
        }

        next();
    }
}