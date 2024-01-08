require('dotenv').config();
const express = require("express");
const cors = require('cors');
const path = require("path");

const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));

const invoke = async () => {
    try{
        app.listen(port);
    } catch (exception){
        console.log(exception);
    }
}

invoke();