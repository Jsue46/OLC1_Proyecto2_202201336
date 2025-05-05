import React, { useState, useRef } from "react";
import "./Inicio.css";

const Inicio = () => {
    const [command, setCommand] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState("nuevo.ci");
    const [isNewFile, setIsNewFile] = useState(true);
    const fileInputRef = useRef(null);

    const generateNewFileName = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('es-ES', { hour12: false }).replace(/:/g, '');
        const dateString = now.toLocaleDateString('es-ES').replace(/\//g, '-');
        return `nuevo-${dateString}-${timeString}.ci`;
    };

    const newFile = () => {
        if (command.trim() !== "" && !window.confirm("¿Deseas crear un nuevo archivo? Perderás los cambios no guardados.")) {
            return;
        }
        
        const newName = generateNewFileName();
        setCommand("");
        setOutput("");
        setFileName(newName);
        setIsNewFile(true);
        setOutput(`📄 Nuevo archivo creado: ${newName}`);
    };

    const loadFile = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.name.endsWith('.ci')) {
                alert("Por favor, carga un archivo con extensión .ci");
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                setCommand(e.target.result);
                setFileName(file.name);
                setIsNewFile(false);
                setOutput(`✅ Archivo "${file.name}" cargado correctamente. Listo para ejecutar.`);
            };
            reader.onerror = () => {
                setOutput("❌ Error al leer el archivo");
            };
            reader.readAsText(file);
        }
    };

    const executeCommand = async () => {
        if (!command.trim()) {
            alert("Por favor, ingresa un comando o carga un archivo de script.");
            return;
        }

        setLoading(true);
        setOutput("⚙️ Ejecutando comandos...\n");

        try {
            const response = await fetch("http://localhost:8080/interpreter/parserfile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ command }),
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            // Cambiar de result.output a result.console para coincidir con el backend
            setOutput(result.console || "No se recibió respuesta del servidor");
            
        } catch (error) {
            setOutput(`❌ Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const clearOutput = () => {
        setOutput("");
    };

    const saveFile = () => {
        if (!command.trim()) {
            alert("No hay contenido para guardar.");
            return;
        }
        
        if (isNewFile) {
            const userFileName = window.prompt(
                "Ingresa el nombre del archivo (sin extensión):", 
                fileName.replace('.ci', '')
            );
            
            if (userFileName === null) return;
            
            if (!userFileName.trim()) {
                alert("Debes ingresar un nombre válido");
                return;
            }
            
            const finalName = userFileName.endsWith('.ci') 
                ? userFileName 
                : `${userFileName}.ci`;
            
            setFileName(finalName);
            setIsNewFile(false);
        }
        
        const blob = new Blob([command], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
        setOutput(`💾 Archivo guardado como: ${fileName}`);
    };

    return (
        <div className="inicio-container">
            <h1 className="main-title">SIMPLICODE</h1>
            <div className="file-info">
                <i className={`fas ${isNewFile ? "fa-file-plus" : "fa-file-alt"}`}></i>
                <span>{fileName}</span>
                {isNewFile && <span className="file-status">(nuevo)</span>}
            </div>

            <div className="editor-content">
                <div className="file-actions">
                    <button onClick={newFile} className="btn btn-new" disabled={loading}>
                        <i className="fas fa-file"></i> Nuevo
                    </button>
                    
                    <input 
                        type="file" 
                        ref={fileInputRef}
                        accept=".ci" 
                        style={{ display: "none" }} 
                        onChange={loadFile} 
                        disabled={loading}
                    />
                    <button onClick={() => fileInputRef.current.click()} className="btn btn-load" disabled={loading}>
                        <i className="fas fa-folder-open"></i> Abrir
                    </button>
                    
                    <button onClick={saveFile} className="btn btn-save" disabled={loading}>
                        <i className="fas fa-save"></i> Guardar
                    </button>
                    
                    <button onClick={executeCommand} className="btn btn-execute" disabled={loading}>
                        {loading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-play"></i>} Ejecutar
                    </button>
                    
                    <button onClick={clearOutput} className="btn btn-clear-output" disabled={loading}>
                        <i className="fas fa-broom"></i> Limpiar Consola
                    </button>
                </div>

                <div className="input-section">
                    <textarea 
                        value={command} 
                        onChange={(e) => setCommand(e.target.value)} 
                        placeholder="Escribe tu código aquí..."
                        disabled={loading}
                        className="code-input"
                    ></textarea>
                </div>

                <div className="output-section">
                    <div className="section-header">
                        <label className="section-label">CONSOLA</label>
                        <span className="line-count">{command.split('\n').length} líneas</span>
                    </div>
                    <div className="output-content">
                        {output ? (
                            <pre className={output.startsWith("❌") ? "error-output" : ""}>{output}</pre>
                        ) : (
                            <div className="empty-output">
                                <i className="fas fa-terminal"></i>
                                <p>Los resultados aparecerán aquí</p>
                            </div>
                        )}
                        {loading && <div className="loading"><i className="fas fa-spinner fa-spin"></i> Procesando...</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inicio;