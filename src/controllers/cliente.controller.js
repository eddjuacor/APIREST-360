//para hacer consultas hay que importar la base de datos
import sequelize from '../database/db.js'


export const obtenerClientes = async (req, res) => {
    try {
        const clientes = await sequelize.query("SELECT * FROM Clientes")

        res.status(200).json(clientes); 
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los clientes', error: error.message });
    }
    
}

export const obtenerCliente = async(req, res) => {
    const {idClientes} = req.params;
  try {
    const cliente = await sequelize.query(
        `SELECT * FROM Productos where idClientes = :idClientes`, // Consulta SQL directa
        {
          replacements: {idClientes: idClientes},
          type: sequelize.QueryTypes.SELECT
        }
    );

    res.status(200).json(cliente); // Devuelve las categorías en formato JSON
} catch (error) {
    res.status(500).json({ message: 'Error al obtener el cliente', error: error.message });
}
}

export const crearCliente = async(req, res) => {
    const{
        razon_social,
        nombre_comercial,
        direccion_entrega,
        telefono,
        email
    }= req.body;

    try {
        const resultado = await sequelize.query(
            `EXEC SP_InsertarCliente
                @razon_social = :razon_social,
                @nombre_comercial = :nombre_comercial,
                @direccion_entrega = :direccion_entrega,
                @email = :email`,
            {
                replacements:{
                    razon_social,
                    nombre_comercial,
                    direccion_entrega,
                    telefono,
                    email
                },
                type: sequelize.QueryTypes.RAW
            }
        );

        return res.status(201).json({
            message: "Cliente insertado exitosamente",
            data: resultado,
        });
    } catch (error) {
        console.error("Error al insertar el cliente:", error.message);
        return res.status(500).json({
            message: "Error al insertar cliente",
            error:error.message,
        });
    }
   
};


export const actualizarCliente = async(req, res) => {
    const {
        idClientes,
        razon_social,
        nombre_comercial,
        direccion_entrega,
        telefono,
        email
    }= req.body;

    try {

        const resultado = await sequelize.query(
         `EXEC SP_ActualizarCliente
                @idClientes = :idClientes
                @razon_social = :razon_social,
                @nombre_comercial = :nombre_comercial,
                @direccion_entrega = :direccion_entrega,
                @telefono = :telefono,
                @email = :email`,
            {
                replacements:{
                    idClientes,
                    razon_social,
                    nombre_comercial,
                    direccion_entrega,
                    telefono,
                    email
                },
                type: sequelize.QueryTypes.RAW
               
            } 
        );

        return res.status(200).json({
            message: "Cliente actualizado exitosamente",
            data: resultado,
        });

    } catch (error) {
        console.error("Error al actualizar el cliente", error.message)
        return res.status(500).json({
            message: "Error al actualizar el cliente",
            error: error.message
        });
    }
};

