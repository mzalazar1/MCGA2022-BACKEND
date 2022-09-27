//require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose")
const cors = require("cors")

const app = express();

const port = 4000;


app.use(express.json());
app.set("json spaces", 2);
app.use(cors());
app.use(express.static("public"));

//todas las rutas con el prefijo /api
app.use("/api", require("./src/routes"));


app.get('/', (req, res) => {
    res.send('Hello World!')
});

mongoose.connect('mongodb + srv://mzalazar1:marcos1234@cluster0.11cqgzf.mongodb.net/MCGADATABASE?retryWrites=true&w=majority')
    .then(() => {
        console.log("🟢 DB Connected");
        app.listen({ port: 4000 }, () => {
            console.log(`🚗 Server running on port ${4000}`);
        });
    })
    .catch((err) => {
        console.log("🔴 There was an error on the DB connection method.");
        console.log(err);
    });

