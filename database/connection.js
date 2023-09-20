const mongoose = require("mongoose");

const con = async() => {
    try {

        await mongoose.connect("mongodb://127.0.0.1:27017/my_blog");

        console.log("Connection Successful");

    }catch(error){
        console.log(error);
        throw new Error("Can't stablish connection to database");
    }
}

module.exports = {
    con
}