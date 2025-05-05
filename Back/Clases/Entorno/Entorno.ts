import { Console } from "console";
import { salidasConsola, errores } from "../Utilidades/Salida";
import { Tipo } from "../Utilidades/Tipo";
import { Simbolo } from "./Simbolo";
import { Error } from "../Utilidades/Error";
import { TipoError } from "../Utilidades/TipoError"; 

export class Entorno {
    public ids: Map<string, Simbolo> = new Map<string, Simbolo>()

    constructor(private anterior: Entorno | null, public nombre: string) {}

    // === Guardar Variable ===
    public guardarVariable(id: string, valor: any, tipo: Tipo, linea: number, columna: number): boolean {
        let entorno: Entorno = this;
        
        // Verificar si la variable ya existe en este entorno o en entornos superiores
        if (this.existeVariable(id)) {
            errores.push(new Error(
                linea, 
                columna, 
                TipoError.SEMANTICO, 
                `La variable '${id}' ya ha sido declarada en este ámbito`
            ));
            return false;
        }
        
        // Guardar variable
        entorno.ids.set(id, new Simbolo(valor, id, tipo));
        return true;
    }

    // === Obtener Variable ===
    public getVariable(id: string): Simbolo | null {
        let entorno: Entorno | null = this;
        while (entorno != null) {
            if (entorno.ids.has(id)) {
                return entorno.ids.get(id)!;
            }
            entorno = entorno.anterior;
        }
        return null;
    }

    // === Actualizar Variable ===
    public actualizarVariable(id: string, nuevoValor: any, linea?: number, columna?: number): boolean {
        let entorno: Entorno | null = this;
        
        while (entorno != null) {
            if (entorno.ids.has(id)) {
                const simbolo = entorno.ids.get(id)!;
                
                // Validar tipo (opcional, dependiendo de si quieres permitir cambio de tipo)
                if (typeof nuevoValor !== typeof simbolo.valor && 
                    !(typeof nuevoValor === 'number' && typeof simbolo.valor === 'number')) {
                    if (linea && columna) {
                        errores.push(new Error(
                            linea, 
                            columna, 
                            TipoError.SEMANTICO, 
                            `No se puede asignar un valor de tipo ${typeof nuevoValor} a la variable '${id}' de tipo ${typeof simbolo.valor}`
                        ));
                    }
                    return false;
                }
                
                // Actualizar valor
                entorno.ids.set(id, new Simbolo(nuevoValor, id, simbolo.tipo));
                return true;
            }
            entorno = entorno.anterior;
        }
        
        // Variable no encontrada
        if (linea && columna) {
            errores.push(new Error(
                linea, 
                columna, 
                TipoError.SEMANTICO, 
                `La variable '${id}' no ha sido declarada`
            ));
        }
        return false;
    }

    // === Verificar existencia de variable ===
    private existeVariable(id: string): boolean {
        let entorno: Entorno | null = this;
        while (entorno != null) {
            if (entorno.ids.has(id)) {
                return true;
            }
            entorno = entorno.anterior;
        }
        return false;
    }

    public setPrint(print: string) {
        salidasConsola.push(print);
    }
}