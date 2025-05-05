import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { Tipo, TipoRetorno } from "../Utilidades/Tipo";
import { TipoExpresion } from "../Utilidades/TipoExpresion";

export class Relacional extends Expresion{
    private tipo: Tipo = Tipo.NULL;
    constructor(linea: number, columna: number, public exp1: Expresion, public signo: string, public exp2: Expresion) {
        super(linea, columna, TipoExpresion.RELACIONAL);
    }

    public ejecutar(entorno: Entorno): TipoRetorno {
        switch(this.signo) {
            case '==':
                return this.igual(entorno);
            case '!=':
                return this.diferente(entorno);
            case '<':
                return this.menor(entorno);
            case '<=':
                return this.menorIgual(entorno);
            case '>':
                return this.mayor(entorno);
            case '>=':
                return this.mayorIgual(entorno);
            default:
                throw new Error(`Operador relacional no reconocido: ${this.signo}`);
        }
    }

    igual(entorno: Entorno): TipoRetorno {
        const valor1 = this.exp1.ejecutar(entorno);
        const valor2 = this.exp2.ejecutar(entorno);
        this.tipo = Tipo.BOOLEANO;

        // Comparaciones válidas según la tabla del PDF
        if (valor1.tipo === Tipo.ENTERO || valor1.tipo === Tipo.DECIMAL || 
            valor1.tipo === Tipo.BOOLEANO || valor1.tipo === Tipo.CARACTER || 
            valor1.tipo === Tipo.CADENA || valor1.tipo === Tipo.NULL) {
            
            if (valor2.tipo === Tipo.ENTERO || valor2.tipo === Tipo.DECIMAL || 
                valor2.tipo === Tipo.BOOLEANO || valor2.tipo === Tipo.CARACTER || 
                valor2.tipo === Tipo.CADENA || valor2.tipo === Tipo.NULL) {
                
                // Comparamos los valores
                return {valor: valor1.valor == valor2.valor, tipo: this.tipo};
            }
        }
        
        // Si no se cumple ninguna condición, retornar NULL
        return {valor: 'NULL', tipo: Tipo.NULL};
    }

    diferente(entorno: Entorno): TipoRetorno {
        const valor1 = this.exp1.ejecutar(entorno);
        const valor2 = this.exp2.ejecutar(entorno);
        this.tipo = Tipo.BOOLEANO;

        // Comparaciones válidas según la tabla del PDF
        if (valor1.tipo === Tipo.ENTERO || valor1.tipo === Tipo.DECIMAL || 
            valor1.tipo === Tipo.BOOLEANO || valor1.tipo === Tipo.CARACTER || 
            valor1.tipo === Tipo.CADENA || valor1.tipo === Tipo.NULL) {
            
            if (valor2.tipo === Tipo.ENTERO || valor2.tipo === Tipo.DECIMAL || 
                valor2.tipo === Tipo.BOOLEANO || valor2.tipo === Tipo.CARACTER || 
                valor2.tipo === Tipo.CADENA || valor2.tipo === Tipo.NULL) {
                
                // Comparamos los valores
                return {valor: valor1.valor != valor2.valor, tipo: this.tipo};
            }
        }
        
        // Si no se cumple ninguna condición, retornar NULL
        return {valor: 'NULL', tipo: Tipo.NULL};
    }

    menor(entorno: Entorno): TipoRetorno {
        const valor1 = this.exp1.ejecutar(entorno);
        const valor2 = this.exp2.ejecutar(entorno);
        this.tipo = Tipo.BOOLEANO;

        // Comparaciones válidas según la tabla del PDF
        if (valor1.tipo === Tipo.ENTERO || valor1.tipo === Tipo.DECIMAL || 
            valor1.tipo === Tipo.CARACTER) {
            
            if (valor2.tipo === Tipo.ENTERO || valor2.tipo === Tipo.DECIMAL || 
                valor2.tipo === Tipo.CARACTER) {
                
                // Comparamos los valores
                return {valor: valor1.valor < valor2.valor, tipo: this.tipo};
            }
        }
        
        // Si no se cumple ninguna condición, retornar NULL
        return {valor: 'NULL', tipo: Tipo.NULL};
    }

    menorIgual(entorno: Entorno): TipoRetorno {
        const valor1 = this.exp1.ejecutar(entorno);
        const valor2 = this.exp2.ejecutar(entorno);
        this.tipo = Tipo.BOOLEANO;

        // Comparaciones válidas según la tabla del PDF
        if (valor1.tipo === Tipo.ENTERO || valor1.tipo === Tipo.DECIMAL || 
            valor1.tipo === Tipo.CARACTER) {
            
            if (valor2.tipo === Tipo.ENTERO || valor2.tipo === Tipo.DECIMAL || 
                valor2.tipo === Tipo.CARACTER) {
                
                // Comparamos los valores
                return {valor: valor1.valor <= valor2.valor, tipo: this.tipo};
            }
        }
        
        // Si no se cumple ninguna condición, retornar NULL
        return {valor: 'NULL', tipo: Tipo.NULL};
    }

    mayor(entorno: Entorno): TipoRetorno {
        const valor1 = this.exp1.ejecutar(entorno);
        const valor2 = this.exp2.ejecutar(entorno);
        this.tipo = Tipo.BOOLEANO;

        // Comparaciones válidas según la tabla del PDF
        if (valor1.tipo === Tipo.ENTERO || valor1.tipo === Tipo.DECIMAL || 
            valor1.tipo === Tipo.CARACTER) {
            
            if (valor2.tipo === Tipo.ENTERO || valor2.tipo === Tipo.DECIMAL || 
                valor2.tipo === Tipo.CARACTER) {
                
                // Comparamos los valores
                return {valor: valor1.valor > valor2.valor, tipo: this.tipo};
            }
        }
        
        // Si no se cumple ninguna condición, retornar NULL
        return {valor: 'NULL', tipo: Tipo.NULL};
    }

    mayorIgual(entorno: Entorno): TipoRetorno {
        const valor1 = this.exp1.ejecutar(entorno);
        const valor2 = this.exp2.ejecutar(entorno);
        this.tipo = Tipo.BOOLEANO;

        // Comparaciones válidas según la tabla del PDF
        if (valor1.tipo === Tipo.ENTERO || valor1.tipo === Tipo.DECIMAL || 
            valor1.tipo === Tipo.CARACTER) {
            
            if (valor2.tipo === Tipo.ENTERO || valor2.tipo === Tipo.DECIMAL || 
                valor2.tipo === Tipo.CARACTER) {
                
                // Comparamos los valores
                return {valor: valor1.valor >= valor2.valor, tipo: this.tipo};
            }
        }
        
        // Si no se cumple ninguna condición, retornar NULL
        return {valor: 'NULL', tipo: Tipo.NULL};
    }
}