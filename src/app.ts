import express, {Application, Request, Response, NextFunction} from "express";
const app: Application = express();
require('dotenv').config();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello');
});

app.listen(process.env.PORT, () => console.log(`Server listen in port ${process.env.PORT}`));