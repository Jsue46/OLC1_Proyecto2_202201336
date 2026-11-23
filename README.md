# Compiler and Interpreter Platform with Abstract Syntax Tree Engine

Academic project developed for the **Organization of Languages and Compilers 1** course at the Universidad de San Carlos de Guatemala (First Semester 2025).

This repository contains an end-to-end language interpreter and compiler front-end built using Jison, TypeScript, Node.js (Express), and a React web interface.

---

## Overview

The application processes custom source code through lexical, syntactic, and semantic analysis phases. A grammar parser built with Jison validates syntax and produces an Abstract Syntax Tree (AST). The backend executes symbol table lookups, semantic verification, error recovery, and AST evaluation, reporting generated outputs, runtime logs, and execution errors back to a modern React interface.

---

## Architecture

```
[ Web Interface (React) ]
         |
         | HTTP / JSON (Source Code & Configuration)
         v
[ Express API Gateway (Node.js + TypeScript) ]
         │
         ├── [ Lexical & Syntactic Analyzer (Jison) ]
         │         │
         │         v
         ├── [ AST Generation & Validation Engine ]
         │         │
         │         v
         ├── [ Symbol Table & Scope Management ]
         │         │
         │         v
         └── [ Semantic Execution & Interpretation ]
                   │
                   v
         [ Output Generator / Error Table / AST Visualization ]
```

---

## Key Features

- Lexical analysis with token classification and recovery for invalid characters
- Syntactic parsing and grammar rules compiled with Jison
- Complete Abstract Syntax Tree (AST) creation with graphical visualization
- Nested scope handling and runtime symbol table tracking
- Semantic type checking and robust error handling table (lexical, syntactic, semantic)
- Interactive web IDE with editor integration, execution controls, and console output

---

## Technologies

- **Parser Generator:** Jison
- **Backend:** TypeScript, Node.js, Express
- **Frontend:** React, React Router, CSS3, HTML5
- **Tooling:** npm, Batch automation scripts

---

## Repository Structure

```
OLC1_Proyecto2_202201336/
├── Back/
│   ├── Parser/               # Jison grammar and compiled parser
│   ├── Clases/               # AST nodes and expression evaluations
│   ├── Controlador/          # Execution controllers and symbol table
│   ├── Rutas/                # API REST endpoints
│   └── App.ts                # Express server entry point
├── front/                    # React frontend application
├── Documentacion/            # Technical and user manuals
├── Inputs/                   # Test code samples and validation scripts
└── README.md
```

---

## Academic Context

| Field       | Detail                                                 |
|-------------|--------------------------------------------------------|
| Course      | Organization of Languages and Compilers 1 (OLC1)       |
| Institution | Universidad de San Carlos de Guatemala                 |
| Semester    | First Semester 2025                                    |
| Author      | Estuardo Josue Vaquiax Reyes (202201336)               |
