//CONFIGURAMOS EXPRESS -> PASO 9
const express = require('express');
const { dbConnect } = require('./database/config');
const cors = require('cors');

//CONFIGURAMOS DOTENV-> para variables de entorno
require('dotenv').config();

//CONFIGURAMOS EXPRESS
const app = express();
const port = process.env.PORT || 3000;

//CONECTAMOS A LA BBDD
dbConnect();

//CORS-> podemos configurar como queremos que accedan a nuestra pagina
app.use(cors());

//middleware
//CONFIGURAMOS LA CARPETA STATIC
// middleware que se va a ejecutar antes que todo lo demás
app.use(express.static(__dirname + '/public'));

//PARSEAMOS JSON
app.use(express.json());

//RUTAS
//QUEREMOS GENERAR UN RES.JSON
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/todo', require('./routes/todoRoutes'));

// app.use('/', (req, res) => {
//     res.json({
//         ok: true,
//         msg:'hola'
//     })
// });


//APP A LA ESCUCHA
app.listen(port, () => {
    console.log(`Express a la escucha del puerto ${port}`)
});