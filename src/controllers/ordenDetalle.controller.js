//para hacer consultas hay que importar la base de datos
import sequelize from "../database/db.js";

export const obtenerOrdenesConDetalle = async (req, res) => {
  try {
    const [resultado] = await sequelize.query(
      `EXEC SP_ObtenerOrdenesConDetalles`
    );

    if (!resultado || resultado.length === 0) {
      return res.statuc(400).json({
        message: "No se encontraron ordenes con detalles",
      });
    }

    return res.status(200).json({
      message: "Ordenes obtenidas exitosamente",
      data: resultado,
    });
  } catch (error) {
    console.error("Error al obtener las ordenes con detalles:", error.message);
    return res.status(500).json({
      message: "Error al obtener ordenes con detalles",
      error: error.message,
    });
  }
};

export const obtenerOrdenConDetalle = async (req, res) => {
  const { idOrden } = req.params;

  try {
    const [resultado] = await sequelize.query(
      `EXEC SP_ObtenerOrdenConDetallesPorID @idOrden = :idOrden`,
      {
        replacements: { idOrden },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!resultado || resultado.length === 0) {
      return res.status(400).jston({
        message: `No se encontro una orden con el ID ${idOrden}`,
      });
    }

    return res.status(200).json({
      message: "Orden obtenida exitosamente",
      data: resultado,
    });
  } catch (error) {
    console.error("Error al obtener la orden con detalles:", error.message);
    return res.status(500).json({
      message: "Error al obtener la orden con detalles",
      error: error.message,
    });
  }
};

export const crearOrdenDetalle = async (req, res) => {
  const OrdenConDetalles = req.body;

  try {
    const resultado = await sequelize.query(
      `EXEC SP_insertarOrdenConDetalles @OrdenConDetalles = :OrdenConDetalles`,
      {
        replacements: {
          OrdenConDetalles: JSON.stringify(OrdenConDetalles),
        },
        type: sequelize.QueryTypes.RAW,
      }
    );

    return res.status(201).json({
      message: "orden y detealles insertado exitosamente",
      data: resultado,
    });
  } catch (error) {
    console.error("Error al insertar la orden con detalles", error.message);
    return res.status(500).json({
      message: "Error al insertar la orden con detalles",
      error: error.message,
    });
  }
};

export const obtenerOrdenesPorUsuario = async (req, res) => {
  const idUsuarios = req.params.idUsuarios;

  try {
    const [resultado] = await sequelize.query(
      `EXEC SP_ObtenerOrdenesPorUsuario @idUsuarios = :idUsuarios`,
      {
        replacements: { idUsuarios },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!resultado || resultado.length === 0) {
      return res.status(400).json({
        message: `No se encontro ordenes para el usuariocon ID ${idUsuarios}`,
      });
    }

    return res.status(200).json({
      message: "Ordenes obetenidas exitosamente",
      data: resultado,
    });
  } catch (error) {
    console.error("Error al obtener las ordenes por usuario", error.message);
    return res.status(500).json({
      message: "Error al obtener las ordenes por usuario",
      error: error.message,
    });
  }
};

export const actualizarOrdenConDetalles = async (req, res) => {
  const { body } = req;

  try {
    if (!body) {
      return res.status(400).json({
        message: "Los datos de la orden y sus detalles son obligatorios",
      });
    }

    const OrdenConDetalles = JSON.stringify(body);

    await sequelize.query(
      `EXEC SP_ActualizarOrdenConDetalles @OrdenConDetalles = :OrdenConDetalles`,
      {
        replacements: { OrdenConDetalles: OrdenConDetalles },
        type: sequelize.QueryTypes.RAW,
      }
    );
    return res.status(200).json({
      message: "Orden y detalles actualizados correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar la orden con detalles:", error.message);
    return res.status(500).json({
      message: "ERror al acdtualizar la orden con detalles",
      error: error.message,
    });
  }
};

export const actualizarOrden = async (req, res) => {
  const {
    idOrden,
    idUsuarios,
    idEstados,
    nombre_completo,
    direccion,
    telefono,
    correo_electronico,
    fecha_entrega,
    total_orden,
  } = req.body;

  try {
    const resultado = await sequelize.query(
      `EXEC SP_ActualizarOrden
                @idOrden = :idOrden
                @idUsuarios = :idUsuarios,
                @idEstados = :idEstados,
                @nombre_completo = :nombre_completo,
                @direccion = :direccion,
                @telefono = :telefono,
                @correo_electronico = :correo_electronico,
                @fecha_entrega = :fecha_entrega,
                @total_orden = :total_orden`,
      {
        replacements: {
          idOrden,
          idUsuarios,
          idEstados,
          nombre_completo,
          direccion,
          telefono,
          correo_electronico,
          fecha_entrega,
          total_orden,
        },
        type: sequelize.QueryTypes.RAW,
      }
    );

    return res.status(200).json({
      message: "Orden actualizada exitosamente",
      data: resultado,
    });
  } catch (error) {
    console.error("Error al actualizar la orden", error.message);
    return res.status(500).json({
      message: "Error al actualizar la orden",
      error: error.message,
    });
  }
};
