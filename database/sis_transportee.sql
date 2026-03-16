CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol_id INTEGER,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion TEXT,
    telefono VARCHAR(20),
    email VARCHAR(100)
);
CREATE TABLE zonas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);
CREATE TABLE vehiculos (
    id SERIAL PRIMARY KEY,
    placa VARCHAR(20) UNIQUE NOT NULL,
    modelo VARCHAR(100),
    estado VARCHAR(50),
    ultima_revision DATE
);
CREATE TABLE conductores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    licencia VARCHAR(50),
    telefono VARCHAR(20),
    estado VARCHAR(50)
);
CREATE TABLE vehiculo_conductor (
    id SERIAL PRIMARY KEY,
    vehiculo_id INTEGER,
    conductor_id INTEGER,
    fecha_inicio DATE,
    fecha_fin DATE,
    FOREIGN KEY (vehiculo_id) REFERENCES vehiculos(id),
    FOREIGN KEY (conductor_id) REFERENCES conductores(id)
);
CREATE TABLE rutas (
    id SERIAL PRIMARY KEY,
    zona_id INTEGER,
    vehiculo_id INTEGER,
    fecha DATE,
    FOREIGN KEY (zona_id) REFERENCES zonas(id),
    FOREIGN KEY (vehiculo_id) REFERENCES vehiculos(id)
);
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER,
    ruta_id INTEGER,
    fecha DATE DEFAULT CURRENT_DATE,
    estado VARCHAR(50),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (ruta_id) REFERENCES rutas(id)
);
CREATE TABLE detalle_pedidos (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER,
    producto VARCHAR(100),
    cantidad INTEGER,
    precio_unitario NUMERIC(10,2),
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);
CREATE TABLE entregas (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER,
    fecha_entrega TIMESTAMP,
    estado VARCHAR(50),
    firma_foto TEXT,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);
CREATE TABLE devoluciones (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER,
    motivo TEXT,
    fecha DATE,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);
CREATE TABLE proveedores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    contacto VARCHAR(100),
    telefono VARCHAR(20)
);
CREATE TABLE repuestos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    proveedor_id INTEGER,
    costo NUMERIC(10,2),
    FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)
);
CREATE TABLE inventario_repuestos (
    id SERIAL PRIMARY KEY,
    repuesto_id INTEGER,
    cantidad INTEGER,
    FOREIGN KEY (repuesto_id) REFERENCES repuestos(id)
);
CREATE TABLE mantenimientos (
    id SERIAL PRIMARY KEY,
    vehiculo_id INTEGER,
    tipo VARCHAR(50),
    fecha DATE,
    costo NUMERIC(10,2),
    FOREIGN KEY (vehiculo_id) REFERENCES vehiculos(id)
);
CREATE TABLE ordenes_trabajo (
    id SERIAL PRIMARY KEY,
    mantenimiento_id INTEGER,
    descripcion TEXT,
    fecha DATE,
    estado VARCHAR(50),
    FOREIGN KEY (mantenimiento_id) REFERENCES mantenimientos(id)
);
CREATE TABLE incidencias (
    id SERIAL PRIMARY KEY,
    vehiculo_id INTEGER,
    tipo VARCHAR(50),
    descripcion TEXT,
    fecha DATE,
    FOREIGN KEY (vehiculo_id) REFERENCES vehiculos(id)
);
CREATE TABLE combustible (
    id SERIAL PRIMARY KEY,
    vehiculo_id INTEGER,
    litros NUMERIC(10,2),
    fecha DATE,
    FOREIGN KEY (vehiculo_id) REFERENCES vehiculos(id)
);
CREATE TABLE documentos (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50),
    url TEXT,
    vehiculo_id INTEGER,
    pedido_id INTEGER,
    FOREIGN KEY (vehiculo_id) REFERENCES vehiculos(id),
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);
