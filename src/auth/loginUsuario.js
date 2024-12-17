import bcrypt from 'bcryptjs'
import sequelize from '../database/db.js'
import jwt from 'jsonwebtoken'


export const loginUsuario = async (req, res) => {
    const {correo_electronico, password} = req.body

    try {
        const [usuarios] = await sequelize.query(
            `SELECT * FROM Usuarios WHERE correo_electronico = :correo_electronico`,
            {
                replacements:{correo_electronico},
                type: sequelize.QueryTypes.SELECT
            }
        )

            if(!usuarios){
                return res.status(401).json({
                    message: "Usuario no encontrado"
                })
            }

            //comparamos la contrase;a que nos mandan con la de la base de datos
            const comparandoPassword = await bcrypt.compare(password, usuarios.password);

            if(!comparandoPassword){
                return res.status(401).json({
                    message:"Contrasña incorrecta"
                })
            }

            //firmando token
            const token = jwt.sign(
                {
                    idUsuarios: usuarios.idUsuarios,
                    correo: usuarios.correo_electronico,
                    rol: usuarios.idRol
                },
                process.env.SECRET,
                {expiresIn: "1h"}
            )

            return res.status(200).json({
                message:"Inicio de sesion esxitoso",
                token
            })
    } catch (error) {
        console.error("Error en el inision de sesion", error.message)
        return res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
}