import React, { useState } from 'react';
import { 
  FaTruck, FaBox, FaWrench, FaChartLine, FaChartBar, 
  FaStore, FaTools, FaUsers, FaDollarSign, FaChevronDown, FaChevronRight 
} from 'react-icons/fa';

function Dashboard() {
  const [menuAbierto, setMenuAbierto] = useState(null);

  const toggleMenu = (nombre) => {
    setMenuAbierto(menuAbierto === nombre ? null : nombre);
  };

  const modulos = [
    {
        nombre: 'Transporte',
        icono: <FaTruck />,
        submodulos: [
        { 
            nombre: 'Logística', 
            items: ['Monitor', 'Seguimiento', 'KPIs', 'Control de Horarios'] 
        },
        { 
            nombre: 'Mecánica', 
            items: ['Almacén', 'Proveedor', 'Taller'] 
        },
        { 
            nombre: 'Programador Cliente', 
            items: ['Liquidación', 'Valorizaciones'] 
        }
        ]
    },
    { nombre: 'Distribución', ruta: '/distribucion', icono: <FaBox /> },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Sidebar */}
      <div style={{ 
        width: '260px', 
        minWidth: '260px', 
        background: '#2c3e50', 
        color: 'white', 
        overflowY: 'auto',
        boxSizing: 'border-box'
      }}>
        <h2 style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid #34495e', margin: 0 }}>
          SISTEMA
        </h2>
        
        {modulos.map((modulo) => (
          <div key={modulo.nombre}>
            {/* Elemento Padre */}
            <div 
              onClick={() => modulo.submodulos ? toggleMenu(modulo.nombre) : alert(`Ir a ${modulo.nombre}`)}
              style={{
                padding: '15px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                background: menuAbierto === modulo.nombre ? '#34495e' : 'transparent',
                borderLeft: menuAbierto === modulo.nombre ? '4px solid #3498db' : '4px solid transparent',
                transition: '0.3s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {modulo.icono}
                <span style={{ fontWeight: menuAbierto === modulo.nombre ? 'bold' : 'normal' }}>
                  {modulo.nombre}
                </span>
              </div>
              {modulo.submodulos && (
                menuAbierto === modulo.nombre ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />
              )}
            </div>

            {/* Renderizado de Submódulos */}
            {modulo.submodulos && menuAbierto === modulo.nombre && (
              <div style={{ background: '#1a252f', paddingBottom: '5px' }}>
                {modulo.submodulos.map((sub) => (
                  <div 
                    key={sub.nombre}
                    onClick={() => alert(`Cargando: ${sub.nombre}`)}
                    style={{
                      padding: '10px 20px 10px 45px',
                      fontSize: '0.85rem',
                      color: '#bdc3c7',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      transition: '0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.background = '#243342';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#bdc3c7';
                        e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    {/* Renderizamos el icono del submodulo en pequeño */}
                    <span style={{ fontSize: '1rem' }}>{sub.icono}</span>
                    {sub.nombre}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contenido principal */}
      <div style={{ 
          flex: 1, 
          padding: '40px', 
          background: '#ecf0f1',
          height: '100vh',
          overflowY: 'auto', 
          boxSizing: 'border-box'
      }}>
        <h1 style={{ marginTop: 0 }}>Bienvenido al Sistema de Transporte</h1>
        <p>Selecciona un módulo del menú lateral para continuar.</p>
        
        <div style={{ 
          marginTop: '30px', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px' 
        }}>
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 10px 0' }}><FaTruck /> Estado Actual</h3>
            <p style={{ margin: 0, color: '#7f8c8d' }}>5 unidades en ruta | 12 entregas pendientes</p>
          </div>
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 10px 0' }}><FaChartLine /> KPIs</h3>
            <p style={{ margin: 0, color: '#7f8c8d' }}>95% entregas a tiempo | $12,450 facturado hoy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: 'white', 
  padding: '20px', 
  borderRadius: '10px', 
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
};

export default Dashboard;