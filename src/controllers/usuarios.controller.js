//para hacer consultas hay que importar la base de datos
import sequelize from '../database/db.js'
import bcrypt from 'bcryptjs'


export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await sequelize.query("SELECT * FROM Usuarios")

        res.status(200).json(usuarios); 
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
    }
    
}

export const obtenerUsuario = async(req, res) => {
    const {idUsuarios} = req.params;
  try {
    const usuario = await sequelize.query(
        `SELECT * FROM Usuarios where idUsuarios = :idUsuarios`, // Consulta SQL directa
        {
          replacements: {idUsuarios: idUsuarios},
          type: sequelize.QueryTypes.SELECT
        }
    );

    res.status(200).json(usuario); // Devuelve las categorías en formato JSON
} catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
}
}

export const crearUsuario = async(req, res) => {

    const{
        idRol,
        idEstados,
        correo_electronico,
        nombre_completo,
        password,
        telefono,
        fecha_nacimiento,
        idClientes,
    }= req.body;

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const resultado = await sequelize.query(
            `EXEC SP_InsertarUsuario
                @idRol = :idRol,
                @idEstados = :idEstados,
                @correo_electronico = :correo_electronico,
                @nombre_completo = :nombre_completo,
                @password = :password,
                @telefono = :telefono,
                @fecha_nacimiento = :fecha_nacimiento,
                @idClientes = :idClientes`,
            {
                replacements:{
                    idRol,
                    idEstados,
                    correo_electronico,
                    nombre_completo,
                    password:hashedPassword,
                    telefono,
                    fecha_nacimiento,
                    idClientes
                },
                type: sequelize.QueryTypes.RAW
            }
        );

        return res.status(201).json({
            message: "Usuario insertado exitosamente",
            data: resultado,
        });
    } catch (error) {
        console.error("Error al insertar el usuario:", error.message);
        return res.status(500).json({
            message: "Error al insertar usuario",
            error:error.message,
        });
    }
   
};


export const actualizarUsuario = async(req, res) => {
    const {
        idUsuarios,
        idRol,
        idEstados,
        correo_electronico,
        nombre_completo,
        password,
        telefono,
        fecha_nacimiento,
        idClientes,
    }= req.body;

    try {

        const resultado = await sequelize.query(
         `EXEC SP_ActualizarUsuario
                @idUsuarios = :idUsuarios,
                @idRol = :idRol,
                @idEstados = :idEstados,
                @correo_electronico = :correo_electronico,
                @nombre_completo = :nombre_completo,
                @password = :password,
                @telefono = :telefono,
                @fecha_nacimiento = :fecha_nacimiento,
                @idClientes = :idClientes`,
            {
                replacements:{
                    idUsuarios,
                    idRol,
                    idEstados,
                    correo_electronico,
                    nombre_completo,
                    password,
                    telefono,
                    fecha_nacimiento,
                    idClientes,
                },
                type: sequelize.QueryTypes.RAW
               
            } 
        );

        return res.status(200).json({
            message: "Usuario actualizado exitosamente",
            data: resultado,
        });

    } catch (error) {
        console.error("Error al actualizar el usuario", error.message)
        return res.status(500).json({
            message: "Error al actualizar el usuario",
            error: error.message
        });
    }
};
