import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { Tipo, TipoRetorno } from "../Utilidades/Tipo";
import { TipoExpresion } from "../Utilidades/TipoExpresion";

export class Logico extends Expresion {
    private tipo: Tipo = Tipo.NULL;
    
    constructor(
        linea: number, 
        columna: number, 
        public exp1: Expresion, 
        public signo: string, 
        public exp2?: Expresion // El operando derecho es opcional para operadores unarios
    ) {
        super(linea, columna, TipoExpresion.LOGICO);
    }

    public ejecutar(entorno: Entorno): TipoRetorno {
        switch(this.signo) {
            case '&&':
                return this.and(entorno);
            case '||':
                return this.or(entorno);
            case '!':
                return this.not(entorno);
            default:
                throw new Error(`Operador lógico no reconocido: ${this.signo}`);
        }
    }

    and(entorno: Entorno): TipoRetorno {
        const valor1 = this.exp1.ejecutar(entorno);
        
        // Verificar que el operando sea booleano
        if (valor1.tipo !== Tipo.BOOLEANO) {
            throw new Error(`Error semántico: Operador '&&' no aplicable a tipo ${valor1.tipo} en línea ${this.linea}, columna ${this.columna}`);
        }
        
        // Evaluación en cortocircuito: si el primer operando es falso, no evalúa el segundo
        if (!valor1.valor) {
            return { valor: false, tipo: Tipo.BOOLEANO };
        }
        
        // Solo si el primer operando es verdadero, evalúa el segundo
        const valor2 = this.exp2!.ejecutar(entorno);
        
        if (valor2.tipo !== Tipo.BOOLEANO) {
            throw new Error(`Error semántico: Operador '&&' no aplicable a tipo ${valor2.tipo} en línea ${this.linea}, columna ${this.columna}`);
        }
        
        this.tipo = Tipo.BOOLEANO;
        return { valor: valor1.valor && valor2.valor, tipo: this.tipo };
    }
    
    or(entorno: Entorno): TipoRetorno {
        const valor1 = this.exp1.ejecutar(entorno);
        
        // Verificar que el operando sea booleano
        if (valor1.tipo !== Tipo.BOOLEANO) {
            throw new Error(`Error semántico: Operador '||' no aplicable a tipo ${valor1.tipo} en línea ${this.linea}, columna ${this.columna}`);
        }
        
        // Evaluación en cortocircuito: si el primer operando es verdadero, no evalúa el segundo
        if (valor1.valor) {
            return { valor: true, tipo: Tipo.BOOLEANO };
        }
        
        // Solo si el primer operando es falso, evalúa el segundo
        const valor2 = this.exp2!.ejecutar(entorno);
        
        if (valor2.tipo !== Tipo.BOOLEANO) {
            throw new Error(`Error semántico: Operador '||' no aplicable a tipo ${valor2.tipo} en línea ${this.linea}, columna ${this.columna}`);
        }
        
        this.tipo = Tipo.BOOLEANO;
        return { valor: valor1.valor || valor2.valor, tipo: this.tipo };
    }
    
    not(entorno: Entorno): TipoRetorno {
        // Para el operador NOT, usamos exp1 ya que es un operador unario
        const valor = this.exp1.ejecutar(entorno);
        
        // Verificar que el operando sea booleano
        if (valor.tipo !== Tipo.BOOLEANO) {
            throw new Error(`Error semántico: Operador '!' no aplicable a tipo ${valor.tipo} en línea ${this.linea}, columna ${this.columna}`);
        }
        
        this.tipo = Tipo.BOOLEANO;
        return { valor: !valor.valor, tipo: this.tipo };
    }
}