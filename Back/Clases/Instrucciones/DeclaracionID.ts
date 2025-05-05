import { Expresion } from "../Abstractas/Expresion";
import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { Tipo, TipoRetorno } from "../Utilidades/Tipo";
import { TipoInstruccion } from "../Utilidades/TipoInstruccion";
import { Error } from "../Utilidades/Error";
import { errores } from "../Utilidades/Salida";
import { TipoError } from "../Utilidades/TipoError";

export class DeclaracionID extends Instruccion {
    constructor(
        linea: number, 
        columna: number, 
        private id: string | string[], 
        private tipo: Tipo | Tipo[], 
        private valor: Expresion | Expresion[] | null
    ) {
        super(linea, columna, TipoInstruccion.CREAR_VARIABLE);
    }

    public ejecutar(entorno: Entorno): any {
        // Caso 1: Declaración simple (con valor)
        if (typeof this.id === 'string' && typeof this.tipo === 'number' && this.valor && !Array.isArray(this.valor)) {
            const valor: TipoRetorno = this.valor.ejecutar(entorno);
            this.validarTipo(valor.tipo, this.tipo, this.linea, this.columna);
            entorno.guardarVariable(this.id, valor.valor, this.tipo, this.linea, this.columna);
        }
        // Caso 2: Declaración simple (sin valor - valor por defecto)
        else if (typeof this.id === 'string' && typeof this.tipo === 'number' && !this.valor) {
            const valorPorDefecto = this.obtenerValorPorDefecto(this.tipo);
            entorno.guardarVariable(this.id, valorPorDefecto, this.tipo, this.linea, this.columna);
        }
        // Caso 3: Declaración múltiple (con valores)
        else if (Array.isArray(this.id) && Array.isArray(this.tipo) && Array.isArray(this.valor)) {
            if (this.id.length !== this.valor.length || this.id.length !== this.tipo.length) {
                errores.push(new Error(this.linea, this.columna, TipoError.SEMANTICO, 
                    'La cantidad de variables, tipos y valores no coincide'));
                return;
            }
            
            for (let i = 0; i < this.id.length; i++) {
                const valor: TipoRetorno = this.valor[i].ejecutar(entorno);
                this.validarTipo(valor.tipo, this.tipo[i], this.linea, this.columna);
                entorno.guardarVariable(this.id[i], valor.valor, this.tipo[i], this.linea, this.columna);
            }
        }
        // Caso 4: Declaración múltiple (sin valores)
        else if (Array.isArray(this.id) && Array.isArray(this.tipo) && !this.valor) {
            for (let i = 0; i < this.id.length; i++) {
                const valorPorDefecto = this.obtenerValorPorDefecto(this.tipo[i]);
                entorno.guardarVariable(this.id[i], valorPorDefecto, this.tipo[i], this.linea, this.columna);
            }
        }
    }

    private validarTipo(tipoRecibido: Tipo, tipoEsperado: Tipo, linea: number, columna: number): void {
        if (tipoRecibido !== tipoEsperado) {
            errores.push(new Error(
                linea, 
                columna, 
                TipoError.SEMANTICO, // Cambiado de "SEMANTICO" a TipoError.SEMANTICO
                `No se puede asignar un valor de tipo ${Tipo[tipoRecibido]} a una variable de tipo ${Tipo[tipoEsperado]}`
            ));
        }
    }

    private obtenerValorPorDefecto(tipo: Tipo): any {
        switch(tipo) {
            case Tipo.ENTERO: return 0;//Cero por defecto
            case Tipo.DECIMAL: return 0.0;//Cero por defecto
            case Tipo.BOOLEANO: return true; // Verdadero por defecto
            case Tipo.CARACTER: return '\u0000'; // Caracter nulo por defecto
            case Tipo.CADENA: return "";//Cadena vacía por defecto
            default: return null;
        }
    }
}