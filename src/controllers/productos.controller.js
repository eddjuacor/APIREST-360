//para hacer consultas hay que importar la base de datos
import sequelize from '../database/db.js'


export const obtenerProductos = async (req, res) => {
    try {
        const productos = await sequelize.query("SELECT * FROM Productos")

        res.status(200).json(productos); 
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
    
}

export const obtenerProducto = async(req, res) => {
    const {idProductos} = req.params;
  try {
    const producto = await sequelize.query(
        `SELECT * FROM Productos where idProductos = :idProductos`, // Consulta SQL directa
        {
          replacements: {idProductos: idProductos},
          type: sequelize.QueryTypes.SELECT
        }
    );

    res.status(200).json(producto); // Devuelve las categorías en formato JSON
} catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
}
}



export const crearProducto = async(req, res) => {
    const{
        idCategoriaProductos,
        idUsuarios,
        nombre,
        marca,
        codigo,
        stock,
        idEstados,
        precio,
        foto,
    }= req.body;

    try {
        const resultado = await sequelize.query(
            `EXEC SP_InsertarProducto
                @idCategoriaProductos = :idCategoriaProductos,
                @idUsuarios = :idUsuarios,
                @nombre = :nombre,
                @marca = :marca,
                @codigo = :codigo,
                @stock = :stock,
                @idEstados = :idEstados,
                @precio = :precio,
                @foto = :foto`,
            {
                replacements:{
                    idCategoriaProductos,
                    idUsuarios,
                    nombre,
                    marca,
                    codigo,
                    stock,
                    idEstados,
                    precio,
                    foto
                },
                type: sequelize.QueryTypes.RAW
            }
        );

        return res.status(201).json({
            message: "Producto insertado exitosamente",
            data: resultado,
        });
    } catch (error) {
        console.error("Error al insertar el producto:", error.message);
        return res.status(500).json({
            message: "Error al insertar producto",
            error:error.message,
        });
    }
   
};


export const actualizarProducto = async(req, res) => {
    const {
        idProductos,
        idCategoriaProductos,
        idUsuarios,
        nombre,
        marca,
        codigo,
        stock,
        idEstados,
        precio,
        foto,
    }= req.body;

    try {

        const resultado = await sequelize.query(
         `EXEC SP_ActualizarProducto
                @idProductos = :idProductos,
                @idCategoriaProductos = :idCategoriaProductos,
                @idUsuarios = :idUsuarios,
                @nombre = :nombre,
                @marca = :marca,
                @codigo = :codigo,
                @stock = :stock,
                @idEstados = :idEstados,
                @precio = :precio,
                @foto = :foto`,
            {
                replacements:{
                    idProductos,
                    idCategoriaProductos,
                    idUsuarios,
                    nombre,
                    marca,
                    codigo,
                    stock,
                    idEstados,
                    precio,
                    foto
                },
                type: sequelize.QueryTypes.RAW
               
            } 
        );

        return res.status(200).json({
            message: "Producto actualizado exitosamente",
            data: resultado,
        });

    } catch (error) {
        console.error("Error al actualizar el producto", error.message)
        return res.status(500).json({
            message: "Error al actualizar el producto",
            error: error.message
        });
    }
};

