import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { Tipo, TipoRetorno } from "../Utilidades/Tipo";
import { TipoExpresion } from "../Utilidades/TipoExpresion";
import { Error as CustomError } from "../Utilidades/Error";
import { errores } from "../Utilidades/Salida";
import { TipoError } from "../Utilidades/TipoError";

export class Primitivo extends Expresion {
    constructor(linea: number, columna: number, public valor: any, public tipo: Tipo) {
        super(linea, columna, TipoExpresion.PRIMITIVO);
    }

    public ejecutar(_: Entorno): TipoRetorno {
        try {
            switch(this.tipo) {
                case Tipo.ENTERO:
                    const entero = parseInt(this.valor);
                    if (isNaN(entero)) throw new Error("Valor no es un entero válido");
                    return {valor: entero, tipo: this.tipo};
                case Tipo.DECIMAL:
                    const decimal = parseFloat(this.valor);
                    if (isNaN(decimal)) throw new Error("Valor no es un decimal válido");
                    return {valor: decimal, tipo: this.tipo};
                case Tipo.BOOLEANO:
                    // Asegurar que solo acepte verdadero/false según PDF
                    if (typeof this.valor === 'string') {
                        if (this.valor.toLowerCase() === 'verdadero') return {valor: true, tipo: this.tipo};
                        if (this.valor.toLowerCase() === 'falso') return {valor: false, tipo: this.tipo};
                        throw new Error("Valor booleano debe ser 'verdadero' o 'falso'");
                    }
                    return {valor: Boolean(this.valor), tipo: this.tipo};
                case Tipo.CARACTER:
                    // Manejar secuencias de escape según PDF (sección 5.4)
                    if (this.valor.length === 1) {
                        return {valor: this.valor, tipo: this.tipo};
                    }
                    // Manejar secuencias de escape
                    if (this.valor.startsWith('\\')) {
                        const char = this.manejarSecuenciaEscape(this.valor);
                        return {valor: char, tipo: this.tipo};
                    }
                    throw new Error("Carácter debe tener exactamente 1 caracter");
                case Tipo.CADENA:
                    // Procesar secuencias de escape en cadenas
                    return {valor: this.procesarSecuenciasEscape(this.valor.toString()), tipo: this.tipo};
                default:
                    return {valor: this.valor, tipo: this.tipo};
            }
        } catch (error) {
            errores.push(new CustomError(
                this.linea, 
                this.columna, 
                TipoError.SEMANTICO, 
                error instanceof Error ? (error as globalThis.Error).message : String(error)
            ));
            return {valor: null, tipo: Tipo.NULL};
        }
    }

    private manejarSecuenciaEscape(secuencia: string): string {
        switch(secuencia) {
            case '\\n': return '\n';
            case '\\t': return '\t';
            case '\\"': return '"';
            case '\\\'': return '\'';
            case '\\\\': return '\\';
            default: 
                // Manejar códigos Unicode si es necesario
                if (secuencia.startsWith('\\u')) {
                    const hex = secuencia.substring(2);
                    return String.fromCharCode(parseInt(hex, 16));
                }
                throw new Error(`Secuencia de escape no reconocida: ${secuencia}`);
        }
    }

    private procesarSecuenciasEscape(texto: string): string {
        // Reemplazar todas las secuencias de escape
        return texto
            .replace(/\\n/g, '\n')
            .replace(/\\t/g, '\t')
            .replace(/\\"/g, '"')
            .replace(/\\'/g, '\'')
            .replace(/\\\\/g, '\\');
    }
}