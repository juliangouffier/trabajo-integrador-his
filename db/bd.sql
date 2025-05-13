CREATE TABLE sector (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE habitacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(10) NOT NULL,
    sector_id INT NOT NULL,
    FOREIGN KEY (sector_id) REFERENCES sector(id)
);

CREATE TABLE cama (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(10) NOT NULL,
    habitacion_id INT NOT NULL,
    estado ENUM('LIBRE', 'OCUPADA', 'HIGIENIZANDO') DEFAULT 'LIBRE',
    FOREIGN KEY (habitacion_id) REFERENCES habitacion(id)
);

CREATE TABLE paciente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    sexo ENUM('M', 'F', 'Otro'),
    fecha_nacimiento DATE,
    direccion TEXT,
    telefono VARCHAR(20),
    contacto_emergencia VARCHAR(100)
);

CREATE TABLE admision (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    fecha_ingreso DATETIME NOT NULL,
    motivo TEXT,
    cama_id INT,
    estado ENUM('ACTIVA', 'CANCELADA', 'ALTA') DEFAULT 'ACTIVA',
    derivado_guardia BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (paciente_id) REFERENCES paciente(id),
    FOREIGN KEY (cama_id) REFERENCES cama(id)
);

CREATE TABLE personal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    tipo ENUM('ENFERMERO', 'MEDICO')
);

CREATE TABLE evaluacion_enfermeria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admision_id INT NOT NULL,
    enfermero_id INT NOT NULL,
    historial_medico TEXT,
    sintomas TEXT,
    fecha DATETIME DEFAULT NOW(),
    FOREIGN KEY (admision_id) REFERENCES admision(id),
    FOREIGN KEY (enfermero_id) REFERENCES personal(id)
);

CREATE TABLE signos_vitales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    evaluacion_id INT NOT NULL,
    presion_arterial VARCHAR(10),
    frecuencia_cardiaca INT,
    frecuencia_respiratoria INT,
    temperatura DECIMAL(4,2),
    fecha DATETIME DEFAULT NOW(),
    FOREIGN KEY (evaluacion_id) REFERENCES evaluacion_enfermeria(id)
);

CREATE TABLE evaluacion_medica (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admision_id INT NOT NULL,
    medico_id INT NOT NULL,
    diagnostico TEXT,
    tratamiento TEXT,
    fecha DATETIME DEFAULT NOW(),
    FOREIGN KEY (admision_id) REFERENCES admision(id),
    FOREIGN KEY (medico_id) REFERENCES personal(id)
);
