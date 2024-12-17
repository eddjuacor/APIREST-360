import sequelize from '../database/db.js'

export const obtenerEstados = async(req, res) =>{
    try {
        const resultado = await sequelize.query("SELECT * FROM Estados")

        res.status(200).json(resultado)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los estados'})
    }
}


export const obtenerEstado = async(req, res) =>{
    const {idEstados} = req.params;

    try {
        const estado = await sequelize.query(
            `SELECT * FROM Estados where idEstados = :idEstados`,
            {
                replacements: {idEstados: idEstados},
                type: sequelize.QueryTypes.SELECT
            }
        );

        res.status(200).json(estado)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el estado", error: error.message})
    }

};


export const crearEstado = async(req, res) => {
    const{nombre} = req.body

    try {
        const resultado = await sequelize.query(
            `EXEC SP_InsertarEstado
                @nombre = :nombre
            `,
            {
                replacements:{
                    nombre,
                },
                type:sequelize.QueryTypes.RAW
            }
        );

        return res.status(201).json({
            message: "Estado insertado exitosamente",
            data: resultado
        });

    } catch (error) {
        console.error("Error al insertar el Estado",  error.message)
        return res.status(500).json({
            message: "Error al insertar el Estado",
            error: error.message
        });
    }
};


export const actualizarEstado = async(req, res) => {
    const {
        idEstados,
        nombre,
    }= req.body;

    try {

        const resultado = await sequelize.query(
         `EXEC SP_ActualizarEstado
                @idEstados = :idEstados,
                @nombre = :nombre`,
            {
                replacements:{
                    idEstados,
                    nombre,
                },
                type: sequelize.QueryTypes.RAW
               
            } 
        );

        return res.status(200).json({
            message: "Estado actualizado exitosamente",
            data: resultado,
        });

    } catch (error) {
        console.error("Error al actualizar el Estado", error.message)
        return res.status(500).json({
            message: "Error al actualizar el Estado",
            error: error.message
        });
    }
};


