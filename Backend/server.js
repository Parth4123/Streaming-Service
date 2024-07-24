import express from 'express';
import routes from './routes/routes.js'
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();

const corsOptions = { origin: true, optionalSuccessStatus: 200 };

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/streamlit/v1", routes);

app.use("*",(req,res) => { res.status(404).send("Not Found") });

export default app;