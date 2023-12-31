import express from 'express';
import 'dotenv/config';
import rotas from './rotas/servidor.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rotas);

const port = process.env.PORT || 3000;

app.listen(port);