import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { Tipo, TipoRetorno } from "../Utilidades/Tipo";
import { TipoExpresion } from "../Utilidades/TipoExpresion";
import { suma, resta,multiplicacion,division,potencia,modulo} from "../Utilidades/OperacionDominante";

export class Aritmetico extends Expresion{
    private tipo: Tipo = Tipo.NULL;
    constructor(linea: number, columna: number, public exp1: Expresion, public signo: string, public exp2: Expresion) {
        super(linea, columna, TipoExpresion.ARMITEMETICO);
    }

    public ejecutar(entorno: Entorno): TipoRetorno {
        switch(this.signo) {
            case '+':
                return this.suma(entorno);
            case '-':
                if (this.exp1 !== undefined) {
                    return this.resta(entorno);
                }
                return this.negacionUnaria(entorno);
            case '*':
                return this.multiplicacion(entorno);
            case '/':
                return this.division(entorno);
            case '^':
                return this.potencia(entorno);
            case '%':
                return this.modulo(entorno);
            default:
                throw new Error(`Operador aritmético no reconocido: ${this.signo}`);
        }
    }

    suma(entorno: Entorno): TipoRetorno {
        const valor1 = this.exp1.ejecutar(entorno);
        const valor2 = this.exp2.ejecutar(entorno);
        this.tipo = suma[valor1.tipo][valor2.tipo];
    
        if (this.tipo !== Tipo.NULL) {
            let val1 = valor1.valor;
            let val2 = valor2.valor;
    
            // Convertir booleanos a enteros
            if (valor1.tipo === Tipo.BOOLEANO) val1 = val1 ? 1 : 0;
            if (valor2.tipo === Tipo.BOOLEANO) val2 = val2 ? 1 : 0;
    
            if (this.tipo === Tipo.ENTERO || this.tipo === Tipo.DECIMAL) {
                // Para operaciones numéricas, convertir caracteres a ASCII
                if (valor1.tipo === Tipo.CARACTER) val1 = val1.charCodeAt(0);
                if (valor2.tipo === Tipo.CARACTER) val2 = val2.charCodeAt(0);
                return { valor: val1 + val2, tipo: this.tipo };
            }
    
            if (this.tipo === Tipo.CADENA) {
                // Para cadenas, mantener caracteres como texto
                return { valor: val1.toString() + val2.toString(), tipo: this.tipo };
            }
        }
    
        return { valor: null, tipo: Tipo.NULL };
    }

    resta(entorno: Entorno): TipoRetorno {
        const valor1 = this.exp1.ejecutar(entorno);
        const valor2 = this.exp2.ejecutar(entorno);
        this.tipo = resta[valor1.tipo][valor2.tipo];
    
        if (this.tipo !== Tipo.NULL) {
            let val1 = valor1.valor;
            let val2 = valor2.valor;
    
            // Convertir booleanos a 1/0
            if (valor1.tipo === Tipo.BOOLEANO) val1 = val1 ? 1 : 0;
            if (valor2.tipo === Tipo.BOOLEANO) val2 = val2 ? 1 : 0;
    
            // Convertir caracteres a ASCII
            if (valor1.tipo === Tipo.CARACTER) val1 = val1.charCodeAt(0);
            if (valor2.tipo === Tipo.CARACTER) val2 = val2.charCodeAt(0);
    
            return { valor: val1 - val2, tipo: this.tipo };
        }
    
        // Combinación no válida (según PDF no se reporta error)
        return { valor: null, tipo: Tipo.NULL };
    }

    negacionUnaria (entorno: Entorno): TipoRetorno {
        const valor = this.exp2.ejecutar(entorno);
        this.tipo = valor.tipo;
        if (this.tipo === Tipo.ENTERO || this.tipo === Tipo.DECIMAL) {
            return {valor: -valor.valor, tipo: this.tipo};
        }
        // Error semántico: no se puede negar un valor que no es numérico
        return {valor: 'NULL', tipo: Tipo.NULL};
    }
    multiplicacion(entorno: Entorno): TipoRetorno {
        const valor1 = this.exp1.ejecutar(entorno);
        const valor2 = this.exp2.ejecutar(entorno);
        this.tipo = multiplicacion[valor1.tipo][valor2.tipo];

        if (this.tipo !== Tipo.NULL) {
            let val1 = valor1.valor;
            let val2 = valor2.valor;

            // Convertir caracteres a ASCII
            if (valor1.tipo === Tipo.CARACTER) val1 = val1.charCodeAt(0);
            if (valor2.tipo === Tipo.CARACTER) val2 = val2.charCodeAt(0);

            return { valor: val1 * val2, tipo: this.tipo };
        }

        // Combinación inválida según el PDF
        return { valor: null, tipo: Tipo.NULL };
    }
    division(entorno: Entorno): TipoRetorno {
        const valor1 = this.exp1.ejecutar(entorno);
        const valor2 = this.exp2.ejecutar(entorno);
        this.tipo = division[valor1.tipo][valor2.tipo];
        
        if (this.tipo === Tipo.NULL) {
            // Combinación no válida
            return { valor: null, tipo: Tipo.NULL };
        }
        
        let val1 = valor1.valor;
        let val2 = valor2.valor;
        
        // Convertir caracteres a ASCII si es necesario
        if (valor1.tipo === Tipo.CARACTER) val1 = val1.charCodeAt(0);
        if (valor2.tipo === Tipo.CARACTER) val2 = val2.charCodeAt(0);
        
        // Verificar división por cero
        if (val2 === 0) {
            return { valor: null, tipo: Tipo.NULL };
        }
        
        return { valor: val1 / val2, tipo: this.tipo };
    }
    potencia(entorno: Entorno): TipoRetorno {
        const valor1 = this.exp1.ejecutar(entorno);
        const valor2 = this.exp2.ejecutar(entorno);
        this.tipo = potencia[valor1.tipo][valor2.tipo];
        
        if (this.tipo === Tipo.NULL) {
            // Combinación no válida
            return { valor: null, tipo: Tipo.NULL };
        }
        
        let val1 = Number(valor1.valor);
        let val2 = Number(valor2.valor);
        
        // Caso especial: si el exponente es negativo y base es entero, el resultado es decimal
        if (val2 < 0 && this.tipo === Tipo.ENTERO) {
            this.tipo = Tipo.DECIMAL;
        }
        
        const resultado = Math.pow(val1, val2);
        
        // Si el tipo es entero, redondeamos el resultado
        if (this.tipo === Tipo.ENTERO) {
            return { valor: Math.floor(resultado), tipo: this.tipo };
        }
        
        return { valor: resultado, tipo: this.tipo };
    }
    modulo(entorno: Entorno): TipoRetorno {
        const valor1 = this.exp1.ejecutar(entorno);
        const valor2 = this.exp2.ejecutar(entorno);
        this.tipo = modulo[valor1.tipo][valor2.tipo];
        
        if (this.tipo === Tipo.NULL) {
            // Combinación no válida
            return { valor: null, tipo: Tipo.NULL };
        }
        
        let val1 = Number(valor1.valor);
        let val2 = Number(valor2.valor);
        
        // Verificar división por cero
        if (val2 === 0) {
            return { valor: null, tipo: Tipo.NULL };
        }
        
        const resultado = val1 % val2;
        
        return { valor: resultado, tipo: this.tipo };
    }
}