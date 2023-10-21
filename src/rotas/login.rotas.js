import express from 'express';
import { validarDadosLogin, validarDadosUsuario } from '../intermediarios/usuarios.js';
import { cadastrarUsuario, login } from '../controladores/usuarios.js';

const loginRotas = express.Router();

loginRotas.post('/usuario', validarDadosUsuario, cadastrarUsuario);
loginRotas.post('/login', validarDadosLogin, login);

export default loginRotas;