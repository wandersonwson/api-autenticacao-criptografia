import express from 'express';
import validarUsuarioLogado from '../intermediarios/autenticacao.js';
import { validarDadosCarro, validarAtualizacaoCarro } from '../intermediarios/carros.js';
import { atualizarCarro, cadastrarCarro, detalharCarro, excluirCarro, listarCarros } from '../controladores/carros.js';

const carrosRotas = express.Router();

carrosRotas.use(validarUsuarioLogado);
carrosRotas.route('/carro')
    .post(validarDadosCarro, cadastrarCarro)
    .get(listarCarros);
carrosRotas.route('/carro/:id')
    .get(detalharCarro)
    .put(validarAtualizacaoCarro, atualizarCarro)
    .delete(excluirCarro);

export default carrosRotas;