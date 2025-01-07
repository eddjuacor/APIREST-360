//para hacer consultas hay que importar la base de datos
import sequelize from '../database/db.js'

import fs from 'fs'
import multer from "multer";
import path from 'path';
import shortid from 'shortid'
import { fileURLToPath } from 'url';


// Configurar __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para guardar la imagen y devolver la URL
const guardarImagen = {

  storage: multer.diskStorage({

    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../uploads')); // Ruta corregida
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split('/')[1];
      cb(null, `${shortid.generate()}.${extension}`);
    }
  }),

  fileFilter(req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') { // Tipos de archivo corregidos
      cb(null, true);
    } else {
      cb(new Error('Formato no válido'));
    }
  },
};

const upload = multer(guardarImagen).single('foto');

export const subirArchivo = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({ mensaje: error.message }); // Mostrar el mensaje del error
    } else {
      return next();
    }
  });
};


export const obtenerProductos = async (req, res) => {
  try {
    const productos = await sequelize.query("SELECT idProductos, idCategoriaProductos, idUsuarios, nombre, marca, codigo, stock, idEstados, precio, foto FROM Productos",
      {type: sequelize.QueryTypes.SELECT}
    )

    const productoImagen = productos.map((producto) => {
      const conversion = producto.foto ? Buffer.from(producto.foto).toString('base64'): null;
      return{
        ...producto,
        foto: conversion
        ? `data:image/jpeg;base64,${conversion}` 
        : null,
      }
    })

    res.status(200).json(productoImagen);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
  }

}

export const obtenerProducto = async (req, res) => {
  const { idProductos } = req.params;
  try {
    const producto = await sequelize.query(
      `SELECT * FROM Productos where idProductos = :idProductos`, 
      {
        replacements: { idProductos: idProductos },
        type: sequelize.QueryTypes.SELECT
      }
    );

    const productoImagen = producto.map((item) => {
      const conversion = item.foto ? Buffer.from(item.foto).toString('base64'): null;
      return{
        ...item,
        foto: conversion
        ? `data:image/jpeg;base64,${conversion}` 
        : null,
      }
    })

    res.status(200).json(productoImagen); // Devuelve las categorías en formato JSON
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
  }
}



export const crearProducto = async (req, res) => {
  const {
    idCategoriaProductos,
    idUsuarios,
    nombre,
    marca,
    codigo,
    stock,
    idEstados,
    precio

  } = req.body;

  let foto = null;

  if (req.file && req.file.path) {
    try {
      // Leer el archivo como binario
      foto = fs.readFileSync(req.file.path);
    } catch (error) {
      console.error("Error al leer el archivo:", error.message);
      return res.status(500).json({
        message: "Error al procesar la imagen",
        error: error.message,
      });
    }
  }

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
        replacements: {
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
      error: error.message,
    });
  }

};


export const actualizarProducto = async (req, res) => {
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
  } = req.body;

  let foto = null

  if(req.file && req.file.path){
    try {
      foto = fs.readFileSync(req.file.path)
      fs.unlinkSync(req.file.path)
    } catch (error) {
      console.error("Error al leer el archivo", error.message)  
      return res.status(500).json({
        message: "Error al procesar la imagen",
        error: error.message  
      })
    }
  }else{

    const fotoActual = await sequelize.query(
      `SELECT foto FROM Productos WHERE idProductos = :idProductos`,
      {
        replacements: { idProductos },
        type: sequelize.QueryTypes.SELECT
      }
    )

    if(fotoActual.length > 0){
      foto = fotoActual[0].foto
    }
  }

  const categoriaExistente = await sequelize.query(
    `SELECT * FROM CategoriaProductos WHERE idCategoriaProductos = :idCategoriaProductos`,
    {
      replacements: { idCategoriaProductos },
      type: sequelize.QueryTypes.SELECT,
    }
  );

  if (categoriaExistente.length === 0) {
    return res.status(400).json({
      message: "La categoría proporcionada no existe.",
    });
  }

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
        replacements: {
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

