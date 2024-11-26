const express = require('express');
const bodyParser = require('body-parser');
const jsforce = require('jsforce');
const crudRoutes = require('./routes/crud');

// Configuración de Salesforce
const conn = new jsforce.Connection({
  loginUrl: 'https://login.salesforce.com' // Cambia a 'https://test.salesforce.com' para entornos sandbox
});

const USERNAME = 'tu_email@ejemplo.com';
const PASSWORD = 'tu_password_token'; // Contraseña + token de seguridad

// Login en Salesforce
conn.login(USERNAME, PASSWORD, (err, userInfo) => {
  if (err) {
    return console.error('Error al conectar con Salesforce:', err);
  }
  console.log('Conexión exitosa con Salesforce.');
  console.log('Usuario:', userInfo.id);
  console.log('Organización:', userInfo.organizationId);
});

const app = express();
app.use(bodyParser.json());

// Middleware para pasar la conexión de Salesforce a las rutas
app.use((req, res, next) => {
  req.conn = conn;
  next();
});

app.use('/api', crudRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});