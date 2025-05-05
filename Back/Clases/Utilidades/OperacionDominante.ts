import { Tipo } from "./Tipo";

// Definición de la tabla de operaciones dominantes
// La tabla es una matriz donde cada fila y columna representa un tipo de dato
// y el valor en la intersección indica el tipo resultante de la operación
//        ENTERO  DECIMAL  BOOLEANO CARACTER CADENA
// ENTERO    0       1        2        3        4
// DECIMAL   1       1        2        3        4
// BOOLEANO  2       2        2        3        4
// CARACTER  3       3        3        3        4
// CADENA    4       4        4        4        4

export const suma: Tipo[][] = [
    [Tipo.ENTERO,  Tipo.DECIMAL, Tipo.ENTERO, Tipo.ENTERO, Tipo.CADENA],
    [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.DECIMAL,Tipo.DECIMAL,Tipo.DECIMAL],
    [Tipo.ENTERO,  Tipo.DECIMAL, Tipo.NULL,   Tipo.NULL,   Tipo.CADENA],
    [Tipo.ENTERO,  Tipo.DECIMAL, Tipo.NULL,   Tipo.CADENA, Tipo.CADENA],
    [Tipo.CADENA,  Tipo.CADENA,  Tipo.CADENA, Tipo.CADENA, Tipo.CADENA],
]

export const resta: Tipo[][] = [
    [Tipo.ENTERO,  Tipo.DECIMAL, Tipo.ENTERO, Tipo.ENTERO, Tipo.NULL],
    [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.DECIMAL,Tipo.DECIMAL,Tipo.NULL],
    [Tipo.ENTERO,  Tipo.DECIMAL, Tipo.NULL,   Tipo.NULL,   Tipo.NULL],
    [Tipo.ENTERO,  Tipo.DECIMAL, Tipo.NULL,   Tipo.NULL,   Tipo.NULL],
    [Tipo.NULL,    Tipo.NULL,    Tipo.NULL,   Tipo.NULL,   Tipo.NULL],
]

export const multiplicacion: Tipo[][] = [
    [Tipo.ENTERO,  Tipo.DECIMAL, Tipo.NULL,   Tipo.ENTERO, Tipo.NULL],
    [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.NULL,   Tipo.DECIMAL, Tipo.NULL],
    [Tipo.NULL,    Tipo.NULL,    Tipo.NULL,   Tipo.NULL,    Tipo.NULL],
    [Tipo.ENTERO,  Tipo.DECIMAL, Tipo.NULL,   Tipo.NULL,    Tipo.NULL],
    [Tipo.NULL,    Tipo.NULL,    Tipo.NULL,   Tipo.NULL,    Tipo.NULL],
];

export const division: Tipo[][] = [
    [Tipo.DECIMAL,  Tipo.DECIMAL, Tipo.NULL,  Tipo.DECIMAL, Tipo.NULL],
    [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.NULL,   Tipo.DECIMAL, Tipo.NULL],
    [Tipo.NULL,    Tipo.NULL,    Tipo.NULL,   Tipo.NULL,    Tipo.NULL],
    [Tipo.ENTERO,  Tipo.DECIMAL, Tipo.NULL,   Tipo.NULL,    Tipo.NULL],
    [Tipo.NULL,    Tipo.NULL,    Tipo.NULL,   Tipo.NULL,    Tipo.NULL],
];

export const potencia: Tipo[][] = [
    [Tipo.ENTERO,  Tipo.DECIMAL, Tipo.NULL,   Tipo.NULL, Tipo.NULL],
    [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.NULL,   Tipo.NULL, Tipo.NULL], 
    [Tipo.NULL,    Tipo.NULL,    Tipo.NULL,   Tipo.NULL, Tipo.NULL],
    [Tipo.NULL,    Tipo.NULL,    Tipo.NULL,   Tipo.NULL, Tipo.NULL], 
    [Tipo.NULL,    Tipo.NULL,    Tipo.NULL,   Tipo.NULL, Tipo.NULL]  
];

export const modulo: Tipo[][] = [
    [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.NULL,   Tipo.NULL, Tipo.NULL],
    [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.NULL,   Tipo.NULL, Tipo.NULL], 
    [Tipo.NULL,    Tipo.NULL,    Tipo.NULL,   Tipo.NULL, Tipo.NULL],
    [Tipo.NULL,    Tipo.NULL,    Tipo.NULL,   Tipo.NULL, Tipo.NULL], 
    [Tipo.NULL,    Tipo.NULL,    Tipo.NULL,   Tipo.NULL, Tipo.NULL]  
];
