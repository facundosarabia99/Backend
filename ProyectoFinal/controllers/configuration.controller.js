import dotenv from 'dotenv'
dotenv.config()
export async function listaConfiguracion(req, res){
    const configuraciones = dotenv.config();
    console.log(configuraciones)
    return res
        .status(200)
        .json({ configuraciones });
}