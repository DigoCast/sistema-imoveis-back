import express from "express";
import {router} from "./routes";
import cors from "cors";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE");
    app.use(cors());
    next();
})

app.use(router);

app.listen(3001, () => {
    console.log('Server is running in port: 3001');
})