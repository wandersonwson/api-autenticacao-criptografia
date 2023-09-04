import express from 'express';
import { listarCarros, detalharCarro, cadastrarCarro, atualizarCarro, excluirCarro } from '../controladores/carros.js';
const rotas = express();
rotas.get('/carro', listarCarros);
rotas.get('/carro/:id', detalharCarro);
rotas.post('/carro', cadastrarCarro);
rotas.put('/carro/:id', atualizarCarro);
rotas.delete('/carro/:id', excluirCarro);
export default rotas;