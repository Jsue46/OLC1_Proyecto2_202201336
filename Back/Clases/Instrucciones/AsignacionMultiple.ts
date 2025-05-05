import { Instruccion } from "../Abstractas/Instruccion";
import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { TipoInstruccion } from "../Utilidades/TipoInstruccion";
import { Error } from "../Utilidades/Error";
import { errores } from "../Utilidades/Salida";
import { Tipo } from "../Utilidades/Tipo";
import { TipoError } from "../Utilidades/TipoError";

export class AsignacionMultiple extends Instruccion {
    constructor(
        linea: number,
        columna: number,
        private ids: string[],
        private valores: Expresion[]
    ) {
        super(linea, columna, TipoInstruccion.ASIGNACION_MULTIPLE);
    }

    public ejecutar(entorno: Entorno): any {
        if (this.ids.length !== this.valores.length) {
            errores.push(new Error(
                this.linea,
                this.columna,
                TipoError.SEMANTICO,
                'La cantidad de variables y valores no coincide'
            ));
            return;
        }

        for (let i = 0; i < this.ids.length; i++) {
            const variable = entorno.getVariable(this.ids[i]);
            if (!variable) {
                errores.push(new Error(
                    this.linea,
                    this.columna,
                    TipoError.SEMANTICO,
                    `La variable '${this.ids[i]}' no ha sido declarada`
                ));
                continue;
            }

            const valor = this.valores[i].ejecutar(entorno);
            if (valor.tipo !== variable.tipo) {
                errores.push(new Error(
                    this.linea,
                    this.columna,
                    TipoError.SEMANTICO,
                    `No se puede asignar un valor de tipo ${valor.tipo} a la variable '${this.ids[i]}' de tipo ${variable.tipo}`
                ));
                continue;
            }

            entorno.actualizarVariable(this.ids[i], valor.valor);
        }
    }
}