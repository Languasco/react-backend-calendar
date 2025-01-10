const express = require('express'); 
const cors = require('cors');

const { dbConnection } = require('./database/config');
require('dotenv').config();

const app = express();  

//---- base de datos
dbConnection(2);

//--- habilitar cors

app.use( cors() );

//---- directorio publico
app.use(express.static('public'));

//-- lectura y parseo del body
app.use( express.json() );

///--- rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//--- cualquier ruta que no es la de mis ruta las lleve al la carpeta public donde esta la web
app.use('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});


app.listen(process.env.PORT, () => {
    console.log('Server started on port 3000');
});