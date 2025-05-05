import React from "react";
import "./Reportes.css";

const Reportes = () => {
    // Estos datos deberían venir de tu backend o del estado global
    const reports = {
        errors: [],
        symbols: [],
        ast: ""
    };

    return (
        <div className="reportes-container">
            <h1 className="main-title">REPORTES</h1>

            <div className="report-section">
                <h2><i className="fas fa-exclamation-circle"></i> Errores</h2>
                {reports.errors.length > 0 ? (
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>Línea</th>
                                <th>Columna</th>
                                <th>Tipo</th>
                                <th>Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.errors.map((error, index) => (
                                <tr key={index}>
                                    <td>{error.line}</td>
                                    <td>{error.column}</td>
                                    <td>{error.type}</td>
                                    <td>{error.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="empty-report">
                        <i className="fas fa-check-circle"></i>
                        <p>No se encontraron errores</p>
                    </div>
                )}
            </div>

            <div className="report-section">
                <h2><i className="fas fa-table"></i> Tabla de Símbolos</h2>
                {reports.symbols.length > 0 ? (
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Tipo</th>
                                <th>Valor</th>
                                <th>Ámbito</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.symbols.map((symbol, index) => (
                                <tr key={index}>
                                    <td>{symbol.name}</td>
                                    <td>{symbol.type}</td>
                                    <td>{symbol.value}</td>
                                    <td>{symbol.scope}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="empty-report">
                        <i className="fas fa-info-circle"></i>
                        <p>No hay símbolos registrados</p>
                    </div>
                )}
            </div>

            <div className="report-section">
                <h2><i className="fas fa-project-diagram"></i> Árbol Sintáctico</h2>
                {reports.ast ? (
                    <div className="ast-container">
                        <pre>{reports.ast}</pre>
                    </div>
                ) : (
                    <div className="empty-report">
                        <i className="fas fa-info-circle"></i>
                        <p>No hay AST generado</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reportes;