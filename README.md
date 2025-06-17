# 🏥 Trabajo Integrador - Sistema HIS (Hospital Information System)

Proyecto desarrollado para la materia **Programación Web 2**, que simula un sistema de gestión hospitalaria para la admisión de pacientes.

---

## 🔗 URL DEMO

👉 [Link a la demo desplegada en Railway](https://trabajo-integrador-his.onrender.com/)  

Usuarios: `mgonzalez`, `cfernandez`, `alopez`
Password: `xxx`

---

## 🛠️ Tecnologías

- Node.js + Express
- Pug (Motor de plantillas)
- Sequelize ORM
- MySQL (Base de datos) - Utilice un VPS en OVH Linux con mariadb
- Render (Deploy en la nube)
- Bootstrap 5 (Frontend)

---

## 🧠 Funcionalidades principales
- Buscador de Pacientes y Actualizacion de datos
- Admisión con asignación de cama.
- Admisión por distintos tipos de ingreso: **Cita programada**, **Derivado**, **Emergencia**.
- Validaciones por género en camas compartidas.
- Gestión dinámica de habitaciones, sectores y camas.

---

## 📂 Estructura del Proyecto

- `db/bd.sql`: script de creación de la base de datos y sus tablas.
- `db/seed.sql`: datos iniciales para poblar la base (seed).
- `app.js`: punto de entrada de la aplicación.
- `routes/`: rutas de la app.
- `controllers/`: Recibe la petición, llama al service, devuelve respuesta
- `models/`: definición de modelos Sequelize.
- `views/`: vistas del sistema usando Pug.
- `services/`: Aplica la lógica de negocio (validaciones, reglas, flujos)

## ⚙️ Ajustes
- `.ENV` configuracionde PUERTO y JWT KEY
