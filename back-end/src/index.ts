import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cowRouter from "./Routes/cowRoute";
import MedicalExamRouter from "./Routes/medicalExamRoute";
import milkProductionRouter from "./Routes/milkProductionRoute";
import birthRouter from "./Routes/birthRoute";
const cors = require('cors');
const bodyParser = require('body-parser');
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.json());
app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", cowRouter)
app.use("/", MedicalExamRouter)
app.use("/", milkProductionRouter)
app.use('/', birthRouter)
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server!!!");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


