const {con} = require("./database/connection");
const express = require("express");
const cors = require("cors");


//APP STARTUP
console.log("App Started");

//BD CONNECTION
con();

//NODE SERVER
const app = express();
const port = 3001;

//CORS 
app.use(cors());

//BODY => JSON
app.use(express.json());

//ROUTES
app.get("/test" , (req,res) => {

    console.log("Testing");

    return res.status(200).send(`
        <div>
            <h1>Testing route</div>
            <p>first route</p>
        </div>
    `);
})

//LISTENER
app.listen(port, () => {
    console.log("Server listening at port "+port);
});