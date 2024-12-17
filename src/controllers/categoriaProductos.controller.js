//para hacer consultas hay que importar la base de datos
import sequelize from '../database/db.js'


export const obtenerCategorias = async (req, res) => {
    try {
        const categorias = await sequelize.query("SELECT * FROM CategoriaProductos")

        res.status(200).json(categorias); 
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las categorias', error: error.message });
    }
    
}



export const obtenerCategoria = async(req, res) => {

    //extraemos el id de los parametros de la url
    const {idCategoriaProductos} = req.params;
  try {
    const categoria = await sequelize.query(
        `SELECT * FROM CategoriaProductos where idCategoriaProductos = :idCategoriaProductos`,
        {
          replacements: {idCategoriaProductos: idCategoriaProductos},
          type: sequelize.QueryTypes.SELECT
        }
    );

    res.status(200).json(categoria); 
} catch (error) {
    res.status(500).json({ message: 'Error al obtener la categoria', error: error.message });
}
}



export const crearCategoria = async(req, res) => {

    //extraemos los datos enviados desde el cuerpo de la solicitud hhttp
    const{
        idUsuarios,
        nombre,
        idEstados
    }= req.body;

    try {
        const resultado = await sequelize.query(
            `EXEC SP_InsertarCategoriaProductos
                @idUsuarios = :idUsuarios,
                @nombre = :nombre,
                @idEstados = :idEstados`,
            {
                //reemplazamos los valores de los parametros con los datos que nos manda el req.body
                replacements:{
                    idUsuarios,
                    nombre,
                    idEstados
                },
                type: sequelize.QueryTypes.RAW
            }
        );

        return res.status(201).json({
            message: "Categoria insertado exitosamente",
            data: resultado,
        });
    } catch (error) {
        console.error("Error al insertar la categoria:", error.message);
        return res.status(500).json({
            message: "Error al insertar la categoria",
            error:error.message,
        });
    }
   
};


export const actualizarCategoria = async(req, res) => {

     //extraemos los datos enviados desde el cuerpo de la solicitud hhttp
    const {
        idCategoriaProductos,
        idUsuarios,
        nombre,
        idEstados
    }= req.body;

    try {

        const resultado = await sequelize.query(
         `EXEC SP_ActualizarCategoriaProductos
                @idCategoriaProductos = :idCategoriaProductos,
                @idUsuarios = :idUsuarios,
                @nombre = :nombre,
                @idEstados = :idEstados`,
            {
                 //reemplazamos los valores de los parametros con los datos que nos manda el req.body
                replacements:{
                    idCategoriaProductos,
                    idUsuarios,
                    nombre,
                    idEstados
                },
                type: sequelize.QueryTypes.RAW
               
            } 
        );

        return res.status(200).json({
            message: "Categoria actualizada exitosamente",
            data: resultado,
        });

    } catch (error) {
        console.error("Error al actualizar la categoria", error.message)
        return res.status(500).json({
            message: "Error al actualizar la categoria",
            error: error.message
        });
    }
};

