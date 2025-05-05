import './App.css';
import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio/Inicio';
import Reportes from './pages/Reportes/Reportes';
import TabBar from './components/TabBar';

function App() {
  return (
    <div className="app-container">
      <TabBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/reportes" element={<Reportes />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
