import express, {Application} from "express";
import bodyParser from 'body-parser';
import "reflect-metadata";
import {createConnection} from "typeorm";
require('dotenv').config();
//Import Routes
import couponRoutes from "./routes/coupon.routes";
//import statRoutes from "./routes/stat.routes";
//import storeRoutes from "./routes/store.routes";

const app: Application = express();
createConnection();

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.use(couponRoutes);

app.listen(process.env.PORT, () => console.log(`Server listen in port ${process.env.PORT}`));