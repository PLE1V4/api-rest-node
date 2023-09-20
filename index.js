const {con} = require("./database/connection");
const express = require("express");
const cors = require("cors");
const article_routes = require("./routes/article");


//APP STARTUP
console.log("App Started");

//BD CONNECTION
con();

//NODE SERVER
const app = express();
const port = 3900;

//CORS 
app.use(cors());

//BODY => JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//ROUTES
app.use("/api",article_routes);

//LISTENER
app.listen(port, () => {
    console.log("Server listening at port "+port);
});