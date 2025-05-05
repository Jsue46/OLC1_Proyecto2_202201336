import express from 'express';
import router from './Rutas/Interpreter'
// import routerF from '../Rutas/Files'
const app = express();
const port = 8080;
let cors = require('cors')
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hola mundo');
})
app.use('/interpreter', router)
// app.use('/files', routerF)
app.listen(port, () => {
    try {
        return console.log(`Servidor Corriendo en el Puerto${port}`);
    } catch (error) {
        return console.error(error);
    }
});