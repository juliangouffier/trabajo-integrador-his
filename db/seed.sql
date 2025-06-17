INSERT INTO sector (nombre) VALUES ('Emergencias');
INSERT INTO sector (nombre) VALUES ('Clínica Médica');
INSERT INTO sector (nombre) VALUES ('Pediatría');
INSERT INTO sector (nombre) VALUES ('Traumatología');
INSERT INTO sector (nombre) VALUES ('Cirugía General');
INSERT INTO sector (nombre) VALUES ('Unidad Coronaria');
INSERT INTO sector (nombre) VALUES ('Terapia Intensiva');
INSERT INTO sector (nombre) VALUES ('Maternidad');


INSERT INTO obra_social (nombre, descripcion) VALUES ('DOSEP', 'Dirección de Obra Social del Estado Provincial (San Luis)');
INSERT INTO obra_social (nombre, descripcion) VALUES ('OSDE', 'Organización de Servicios Directos Empresarios');
INSERT INTO obra_social (nombre, descripcion) VALUES ('PAMI', 'Instituto Nacional de Servicios Sociales para Jubilados y Pensionados');

INSERT INTO personal (id, nombre, apellido, fecha_nacimiento, sexo, documento, tipo)
VALUES (1, 'María', 'González', '1980-03-22', 'F', '27890123', 'MEDICO');

INSERT INTO personal (id, nombre, apellido, fecha_nacimiento, sexo, documento, tipo)
VALUES (2, 'Carlos', 'Fernández', '1975-08-15', 'M', '25984321', 'ENFERMERO');

INSERT INTO personal (id, nombre, apellido, fecha_nacimiento, sexo, documento, tipo)
VALUES (3, 'Ana', 'López', '1987-11-10', 'F', '30900123', 'MEDICO');

INSERT INTO usuarios (username, persona_id, password, email, telefono)
VALUES ('mgonzalez', 1, '$2a$12$bobTdqMG8ls9chnpN3qfuuYeADSaAsH3tfk5mlOs.icX.nLiceUSS', 'mgonzalez@hospital.gov.ar', '2664123456');

INSERT INTO usuarios (username, persona_id, password, email, telefono)
VALUES ('cfernandez', 2, '$2a$12$bobTdqMG8ls9chnpN3qfuuYeADSaAsH3tfk5mlOs.icX.nLiceUSS', 'cfernandez@hospital.gov.ar', '2664234567');

INSERT INTO usuarios (username, persona_id, password, email, telefono)
VALUES ('alopez', 3, '$2a$12$bobTdqMG8ls9chnpN3qfuuYeADSaAsH3tfk5mlOs.icX.nLiceUSS', 'alopez@hospital.gov.ar', '2664345678');


INSERT INTO paciente (dni, nombre, apellido, sexo, fecha_nacimiento, direccion, telefono, contacto_emergencia, obra_social_id, email)
VALUES (28900876, 'Jorge', 'Pérez', 'M', '1970-06-12', 'Av. España 123, San Luis', '2664112233', '2254445678', 1, 'jperez@gmail.com');

INSERT INTO paciente (dni, nombre, apellido, sexo, fecha_nacimiento, direccion, telefono, contacto_emergencia, obra_social_id, email)
VALUES (29876543, 'Laura', 'Sánchez', 'F', '1985-04-20', 'Calle Junín 456, Villa Mercedes', '2664123344', '2254145678', 2, 'lsanchez@yahoo.com');

INSERT INTO paciente (dni, nombre, apellido, sexo, fecha_nacimiento, direccion, telefono, contacto_emergencia, obra_social_id, email)
VALUES (31456789, 'Pedro', 'Gómez', 'M', '1950-10-01', 'Barrio Sarmiento Mz 3 C10, San Luis', '2664134455', '2254345678', 3, 'pgomez@hotmail.com');

INSERT INTO paciente (dni, nombre, apellido, sexo, fecha_nacimiento, direccion, telefono, contacto_emergencia, obra_social_id, email)
VALUES (30123456, 'Natalia', 'Ferreyra', 'F', '1990-01-15', 'Belgrano 999, San Luis', '2664145566', '2254455678', 1, 'nferreyra@gmail.com');

INSERT INTO paciente (dni, nombre, apellido, sexo, fecha_nacimiento, direccion, telefono, contacto_emergencia, obra_social_id, email)
VALUES (31234567, 'Luis', 'Roldán', 'M', '1978-12-25', 'Av. Illia 1500, San Luis', '2664156677', '2254456728', 2, 'lroldan@gmail.com');

-- Emergencias
INSERT INTO habitacion (id, numero, sector_id) VALUES (1, 'E01', 1);
INSERT INTO cama (id, numero, habitacion_id, estado) VALUES (1, 'C1', 1, 'LIBRE');
INSERT INTO cama (id, numero, habitacion_id, estado) VALUES (2, 'C2', 1, 'LIBRE');

INSERT INTO habitacion (id, numero, sector_id) VALUES (2, 'E02', 1);
INSERT INTO cama (id, numero, habitacion_id, estado) VALUES (3, 'C1', 2, 'LIBRE');

-- Clínica Médica
INSERT INTO habitacion (id, numero, sector_id) VALUES (3, 'CM01', 2);
INSERT INTO cama (id, numero, habitacion_id, estado) VALUES (4, 'C1', 3, 'LIBRE');
INSERT INTO cama (id, numero, habitacion_id, estado) VALUES (5, 'C2', 3, 'LIBRE');

INSERT INTO habitacion (id, numero, sector_id) VALUES (4, 'CM02', 2);
INSERT INTO cama (id, numero, habitacion_id, estado) VALUES (6, 'C1', 4, 'LIBRE');
