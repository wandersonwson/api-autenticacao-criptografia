import express from 'express';
import validarUsuarioLogado from '../intermediarios/autenticacao.js';
import { validarDadosLogin, validarDadosUsuario } from '../intermediarios/usuarios.js';
import { cadastrarUsuario, detalharUsuario, listarUsuarios, login } from '../controladores/usuarios.js';
import { listarCarros, detalharCarro, cadastrarCarro, atualizarCarro, excluirCarro } from '../controladores/carros.js';

const rotas = express.Router();
rotas.post("/usuario", validarDadosUsuario, cadastrarUsuario);
rotas.post("/login", validarDadosLogin, login);

rotas.use(validarUsuarioLogado);
rotas.get("/usuario", listarUsuarios);
rotas.get("/usuario/:id", detalharUsuario);
rotas.post('/carro', cadastrarCarro);
rotas.get('/carro', listarCarros);
rotas.get('/carro/:id', detalharCarro);
rotas.put('/carro/:id', atualizarCarro);
rotas.delete('/carro/:id', excluirCarro);

export default rotas;