INSERT INTO usuarios(matricula,nombre,app,apm,correo,contraseña,id_rol,contacto,nombre_carrera)
VALUES(5122180007,'Jose Saul','Vazquez','Lopez','jose.vazquez.22s@utzmg.edu.mx',123,1,3310407529,'Ing. Desarrollo y Gestión de Software');

INSERT INTO usuarios(matricula_tutor,nombre,app,apm,correo,contraseña,id_rol,contacto)
VALUES(07016,'Cristina Alexandra','Morán','Garabito','cmoran@utzmg.edu.mx',12345,2,3332430448);


INSERT INTO grado_grupo (grado,grupo,id_carrera) VALUES (6,'A', 2);


INSERT INTO tutor(matricula_tutor,nombre_tutor,correo_tutor,contacto_tutor)
VALUES(07016,'Cristina Alexandra Morán Garabito','cmoran@utzmg.edu.mx',3332430448);

INSERT INTO alumnos (matricula, nombre_alumno, app, apm, correo_alumno, contraseña, id_grupo)
VALUES 
(5122180007, 'Jose Saul', 'Vazquez', 'Lopez', 'jose.vazquez.22s@utzmg.edu.mx', 123, 2);

-- Insertar las carreras
INSERT INTO carreras (nombre_carrera) VALUES
('Ing. en Energías Renovables'),
('Ing. Desarrollo y Gestión de Software'),
('Ing. en Mecatrónica'),
('Lic. en Gestión y Desarrollo Turístico'),
('Lic. en Innovación de Negocios y Mercadotecnia'),
('Lic. Protección Civil y Emergencias');


-- Insertar datos en la tabla de roles
INSERT INTO roles (nombre_rol) VALUES ('Usuario');
INSERT INTO roles (nombre_rol) VALUES ('Maestro');
INSERT INTO roles (nombre_rol) VALUES ('Admin');


SELECT * FROM usuarios


-- Crear la tabla de roles primero
CREATE TABLE roles (
    id_rol SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(20) NOT NULL
);

-- Crear la tabla de carreras
CREATE TABLE carreras (
    id_carrera SERIAL PRIMARY KEY,
    nombre_carrera VARCHAR(100) NOT NULL UNIQUE
);

-- Crear la tabla de tutores con UNIQUE en matricula_tutor
CREATE TABLE tutor (
    id_tutor SERIAL PRIMARY KEY,
    matricula_tutor NUMERIC NOT NULL UNIQUE,
    nombre_tutor VARCHAR(50) NOT NULL,
    carrera_tutor INTEGER REFERENCES carreras(id_carrera),
    correo_tutor VARCHAR(50) NOT NULL,
    contacto_tutor NUMERIC
);

-- Crear la tabla de grupos
CREATE TABLE grado_grupo (
    id_grupo SERIAL PRIMARY KEY,
    grado VARCHAR(50) NOT NULL,
    grupo VARCHAR(50) NOT NULL,
    id_carrera INTEGER,
    CONSTRAINT fk_carrera FOREIGN KEY (id_carrera) REFERENCES carreras(id_carrera)
	CONSTRAINT uq_grado_grupo UNIQUE (grado, grupo)  
);


-- Crear la tabla de alumnos
CREATE TABLE alumnos (
    matricula NUMERIC PRIMARY KEY,
    nombre_alumno VARCHAR(40) NOT NULL,
    app VARCHAR(20) NOT NULL,
    apm VARCHAR(20) NOT NULL,
    correo_alumno VARCHAR(50) NOT NULL,
    contraseña VARCHAR(100) NOT NULL,
    id_grupo INTEGER NOT NULL,
    CONSTRAINT fk_grupo_alumnos FOREIGN KEY (id_grupo) REFERENCES grado_grupo(id_grupo)
);

-- Crear la tabla de usuarios
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    matricula NUMERIC,
    matricula_tutor NUMERIC,
    nombre VARCHAR(50) NOT NULL,
    app VARCHAR(20),
    apm VARCHAR(20),
    correo VARCHAR(50) NOT NULL,
    contraseña VARCHAR(100) NOT NULL,
    id_rol INTEGER NOT NULL,
    contacto NUMERIC,
    nombre_carrera VARCHAR(100),
    id_grupo INTEGER,
    grado VARCHAR(50) NOT NULL,
    grupo VARCHAR(50) NOT NULL,
    CONSTRAINT fk_rol_usuarios FOREIGN KEY (id_rol) REFERENCES roles(id_rol),
    CONSTRAINT fk_matricula_usuarios FOREIGN KEY (matricula) REFERENCES alumnos(matricula),
    CONSTRAINT fk_matricula_tutor_usuarios FOREIGN KEY (matricula_tutor) REFERENCES tutor(matricula_tutor),
    CONSTRAINT fk_grupo_usuarios FOREIGN KEY (id_grupo) REFERENCES grado_grupo(id_grupo),
    CONSTRAINT fk_grado FOREIGN KEY (grado) REFERENCES grado_grupo(grado),
    CONSTRAINT fk_grupo FOREIGN KEY (grupo) REFERENCES grado_grupo(grupo),
    CONSTRAINT fk_carrera_usuarios FOREIGN KEY (nombre_carrera) REFERENCES carreras(nombre_carrera)
);

-- Crear la tabla de registro de tutorías
CREATE TABLE registro_tutoria (
    id_registro SERIAL PRIMARY KEY,
    matricula NUMERIC,
	matricula_tutor NUMERIC,
    nombre_alumno VARCHAR(40) NOT NULL,
    app VARCHAR(20) NOT NULL,
    apm VARCHAR(20) NOT NULL,
    correo_alumno VARCHAR(50) NOT NULL,
    asesoria VARCHAR(50),
    comentarios TEXT,
    CONSTRAINT fk_matricula_registro FOREIGN KEY (matricula) REFERENCES alumnos(matricula),
	CONSTRAINT fk_matricula_tutor_registro FOREIGN KEY (matricula_tutor) REFERENCES tutor(matricula_tutor)
);


-- Crear la tabla de planeación curricular
CREATE TABLE planeacion_c (
    id_planeacion SERIAL PRIMARY KEY,
    nombre_carrera INTEGER NOT NULL,
    id_grupo INTEGER NOT NULL,
    id_tutor INTEGER NOT NULL,
    cuatrimestre VARCHAR(20) NOT NULL,
    CONSTRAINT fk_grupo_planeacion FOREIGN KEY (id_grupo) REFERENCES grado_grupo(id_grupo),
    CONSTRAINT fk_tutor_planeacion FOREIGN KEY (id_tutor) REFERENCES tutor(id_tutor),
    CONSTRAINT fk_carrera_planeacion FOREIGN KEY (nombre_carrera) REFERENCES carreras(id_carrera)
);
