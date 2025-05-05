import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './TabBar.css';

const TabBar = () => {
  const location = useLocation();

  return (
    <div className="tab-bar">
      <Link 
        to="/" 
        className={`tab ${location.pathname === '/' ? 'active' : ''}`}
      >
        <i className="fas fa-code"></i>
        <span>Editor</span>
      </Link>
      <Link 
        to="/reportes" 
        className={`tab ${location.pathname === '/reportes' ? 'active' : ''}`}
      >
        <i className="fas fa-chart-bar"></i>
        <span>Reportes</span>
      </Link>
    </div>
  );
};

export default TabBar;