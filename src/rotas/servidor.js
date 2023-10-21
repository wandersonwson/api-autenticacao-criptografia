import express from 'express';
import loginRotas from './login.rotas.js';
import usuarioRotas from './usuario.rotas.js';
import carroRotas from './carro.rotas.js';

const rotas = express.Router();

rotas.use(loginRotas);
rotas.use(usuarioRotas);
rotas.use(carroRotas);

export default rotas;