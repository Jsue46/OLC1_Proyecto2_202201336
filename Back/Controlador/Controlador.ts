import { Request, Response } from "express";
import { getSalida, limpiarSalidas, getErrores } from '../Clases/Utilidades/Salida';
import { Entorno } from "../Clases/Entorno/Entorno";

export class Controlador {

    public running(req: Request, res: Response) {
        res.send('Interpreter is running!!!')
    }
    
    public parserFile(req: Request, res: Response) {
        let code = req.body.command; // Recibe el código del frontend como 'command'
        let parser = require('../Parser/Parser');
        
        try {
            console.log('\x1Bc');
            console.log("Procesando código...");
            
            limpiarSalidas();
            let instrucciones = parser.parse(code);
            const global: Entorno = new Entorno(null, 'Global');
            
            // Redirigir la salida para capturarla
            let outputCapture = '';
            
            for(let instruccion of instrucciones) {
                try {
                    instruccion.ejecutar(global);
                }
                catch (error) {
                    // Captura el error si ocurre
                    outputCapture += `Error: ${error instanceof Error ? error.message : String(error)}\n`;
                }
            }
            
            // Obtener la salida desde la función getSalida()
            var out: string = getSalida();
            
            console.log();
            console.log();
            console.log('\x1b[32mSimpleCode\x1b[0m');
            console.log(out);
            
            // Enviar la respuesta con la salida capturada
            res.json({
                console: out || outputCapture || "Ejecución completada sin salida"
            });
        } catch (error) {
            console.error("Error al procesar código:", error);
            res.status(500).json({
                console: `Error al procesar código: ${error instanceof Error ? error.message : String(error)}`
            });
        }
    }
    
    public getErrores(req: Request, res: Response) {
        try {
            res.json({
                errors: getErrores()
            })
        }
        catch (error) {
            res.json({
                errors: error
            })
        }
    }
}