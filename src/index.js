// 1 -.se requiere dotenv de primero para que cargue primero
// 2 -.se requiere el servidor de express desde el archivo server.js
// 3 -.se requiere las bases de datos desde el archivo database.js
require('dotenv').config();
const app = require('./server');
require('./database');


const port = app.get('port')
app.listen(port, () => {
    console.log(`Server on port: ${port}`);
})