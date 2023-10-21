import express from 'express';
import validarUsuarioLogado from '../intermediarios/autenticacao.js';
import { detalharUsuario, listarUsuarios } from '../controladores/usuarios.js';

const usuarioRotas = express.Router();

usuarioRotas.use(validarUsuarioLogado);
usuarioRotas.get('/usuario', listarUsuarios);
usuarioRotas.get('/usuario/:id', detalharUsuario);

export default usuarioRotas;