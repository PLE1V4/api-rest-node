const {con} = require("./database/connection");
const express = require("express");
const cors = require("cors");


//Inicializar APP
console.log("App Started");

//Conexion a BD
con();

//Crear Node Server
const app = express();
const port = 7777;

//Configurar cors
app.use(cors());

//BODY => JSON
app.use(express.json());

//ROUTES

//crear servidor y escuchar peticiones http
app.listen(port, () => {
    console.log("Server listening at port "+port);
});