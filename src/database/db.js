    import { Sequelize } from '@sequelize/core';
    import { MsSqlDialect } from '@sequelize/mssql';

    import dotenv from 'dotenv';

    dotenv.config()


    const sequelize = new Sequelize({
        dialect: MsSqlDialect,
        server: process.env.BD_HOST,
        port: 1433,
        database: process.env.BD_NOMBRE,
        trustServerCertificate:true,
        authentication:{
            type: 'default',
            options:{
                userName: process.env.BD_USER,
                password: process.env.BD_PASS
            }
        }
    });

    //probando la conexion
    export const ProbandoConexion = async () =>{
        try {
            await sequelize.authenticate();
            console.log('conexion correcta')
        } catch (error) {
            console.log('conexion fallida')
        }
    }


    export default sequelize;

