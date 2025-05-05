import { Instruccion } from "../Abstractas/Instruccion";
import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { TipoInstruccion } from "../Utilidades/TipoInstruccion";
import { Error } from "../Utilidades/Error";
import { errores } from "../Utilidades/Salida";
import { Tipo } from "../Utilidades/Tipo";
import { TipoError } from "../Utilidades/TipoError";

export class Asignacion extends Instruccion {
    constructor(
        linea: number,
        columna: number,
        private id: string,
        private valor: Expresion
    ) {
        super(linea, columna, TipoInstruccion.ASIGNACION);
    }

    public ejecutar(entorno: Entorno): any {
        const variable = entorno.getVariable(this.id);
        if (!variable) {
            errores.push(new Error(
                this.linea,
                this.columna,
                TipoError.SEMANTICO,
                `La variable '${this.id}' no ha sido declarada`
            ));
            return;
        }

        const valor = this.valor.ejecutar(entorno);
        if (valor.tipo !== variable.tipo) {
            errores.push(new Error(
                this.linea,
                this.columna,
                TipoError.SEMANTICO,
                `No se puede asignar un valor de tipo ${valor.tipo} a la variable '${this.id}' de tipo ${variable.tipo}`
            ));
            return;
        }

        entorno.actualizarVariable(this.id, valor.valor);
    }
}
