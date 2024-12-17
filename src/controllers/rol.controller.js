//para hacer consultas hay que importar la base de datos
import sequelize from '../database/db.js'


export const obtenerRoles = async (req, res) => {
    try {
        const roles = await sequelize.query("SELECT * FROM Rol")

        res.status(200).json(roles); 
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los roles', error: error.message });
    }
    
}

export const obtenerRol = async(req, res) => {
    const {idRol} = req.params;
  try {
    const rol = await sequelize.query(
        `SELECT * FROM Rol where idRol = :idRol`, // Consulta SQL directa
        {
          replacements: {idRol: idRol},
          type: sequelize.QueryTypes.SELECT
        }
    );

    res.status(200).json(rol); // Devuelve las categorías en formato JSON
} catch (error) {
    res.status(500).json({ message: 'Error al obtener el rol', error: error.message });
}
}

export const crearRol = async(req, res) => {
    const{nombre }= req.body;

    try {
        const resultado = await sequelize.query(
            `EXEC SP_InsertarRol
                @nombre = :nombre,
               `,
            {
                replacements:{
                    nombre,
                },
                type: sequelize.QueryTypes.RAW
            }
        );

        return res.status(201).json({
            message: "Rol insertado exitosamente",
            data: resultado,
        });
    } catch (error) {
        console.error("Error al insertar el rol:", error.message);
        return res.status(500).json({
            message: "Error al insertar rol",
            error:error.message,
        });
    }
   
};


export const actualizarRol = async(req, res) => {
    const {
        idRol,
        nombre,
    }= req.body;

    try {

        const resultado = await sequelize.query(
         `EXEC SP_ActualizarRol
                @idRol = :idRol,
                @nombre = :nombre`,
            {
                replacements:{
                    idRol,
                    nombre,
                },
                type: sequelize.QueryTypes.RAW
               
            } 
        );

        return res.status(200).json({
            message: "Rol actualizado exitosamente",
            data: resultado,
        });

    } catch (error) {
        console.error("Error al actualizar el Rol", error.message)
        return res.status(500).json({
            message: "Error al actualizar el Rol",
            error: error.message
        });
    }
};
