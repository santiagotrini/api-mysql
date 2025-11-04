// importar paquetes de npm
const express = require('express');
const mysql   = require('mysql');
const cors    = require('cors') ;
const morgan  = require('morgan') ;

// config vars
const PORT = process.env.PORT || 3000;


// creo el objeto app
const app = express();
// vamos a usar cors en toda la app
app.use(cors());  
// vamos a usar morgan tambien en toda la app
app.use(morgan('dev'));
// decirle a Express que parsee los cuerpos en JSON
app.use(express.json());
// conectarse a mysql usando el driver de npm
const connection = mysql.createConnection({
  host: 'localhost',
  // user: 'root',
  database: 'school'
}); // mysql -h localhost -u root school
// dale conectate nomás
connection.connect(() => console.log('Base de datos conectada'));

// la ruta que nos interesa para nuestra API
// por ahora, una que me de todos los alumnos
// usando el objeto conexión con mysql le mandamos el SELECT
// y le pasamos el resultado al cliente pero en formato JSON
// GET /api/students
app.get('/api/students', (req, res) => {
  // console.log(req.query);
  let qs = '';
  if (Object.keys(req.query).length > 0) {
    qs = 'SELECT * FROM students WHERE ';
    for (let key in req.query) {
      if (req.query[key]) qs += `${key}='${req.query[key]}' AND `;
    }
    qs = qs.slice(0,-4);
    // console.log(qs);
  } else {
    qs = 'SELECT * FROM students';
  }
  connection.query(qs, (err, rs) => {
    res.status(200).json(rs);
  });
});
// Esta ruta va a servir para crear un alumno nuevo en la tabla, es decir agrega una fila
// POST /api/students
app.post('/api/students', (req, res) => {
  const { name, surname, age, grade } = req.body; // cuerpo en formato JSON 
  const data = [null,name,surname,age,grade];
  connection.query('INSERT INTO students VALUES (?,?,?,?,?)', data,  (err, rs) => {
    // en HTTP, 201 significa CREATED
    let newStudent = {
      id: rs.insertId,
      name: name,
      surname: surname,
      age: age,
      grade: grade
    };
    res.status(201).json(newStudent);
  });
});

// esta ruta sirve para borrar una fila de students
// DELETE /api/students/id
app.delete('/api/students/:id', (req, res) => {
  let id = req.params.id;
  connection.query('DELETE FROM students WHERE id = ?', [id], (err, rs) => {
    res.status(200).json({ msg: 'Delete OK' });
  });
});

// esta ruta sirve para modificar una fila de students
// PUT /api/students/id
app.put('/api/students/:id', (req, res) => {
  let id = req.params.id;
  const { name, surname, age, grade } = req.body;
  const data = [name, surname, age, grade, id];
  const query = 'UPDATE students SET name = ?, surname = ?, age = ?, grade = ? WHERE id = ?';
  connection.query(query, data, (err, rs) => {
    res.status(200).json({ msg: 'Update OK' });
  });
});


// escucha peticiones que seguro que alguien
// va a pedirte algo
app.listen(PORT, () => {
  console.log('Server andando nomás en el puerto ' + PORT);
});
