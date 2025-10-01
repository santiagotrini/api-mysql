// importar paquetes de npm
const express = require('express');
const mysql   = require('mysql');
const cors    = require('cors') ;
const morgan  = require('morgan') ;

// creo el objeto app
const app = express();
// vamos a usar cors en toda la app
app.use(cors());
// vamos a usar morgan tambien en toda la app
app.use(morgan('dev'));

// conectarse a mysql usando el driver de npm
const connection = mysql.createConnection({
  host: 'localhost',
  user: '',
  password: '',
  database: 'school'
});
// dale conectate nomás
connection.connect();

// la ruta que nos interesa para nuestra API
// por ahora, una que me de todos los alumnos
// usando el objeto conexión con mysql le mandamos el SELECT
// y le pasamos el resultado al cliente pero en formato JSON
app.get('/api/students', (req, res) => {
  connection.query('SELECT * FROM students', (err, rs) => {
    res.status(200).json(rs);
  });
});

// escucha peticiones que seguro que alguien
// va a pedirte algo
app.listen(3000, () => {
  console.log('Server andando nomás en el puerto 3000');
});