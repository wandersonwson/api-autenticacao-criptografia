import { default as knex } from '../dados/conexao.js';
async function listarCarros(request, response) {
	try {
		const carros = await knex("carros").orderBy("id");
		return response.json(carros);
	} catch (error) {
		return response.status(500).json('Erro interno no servidor');
	}
}
async function detalharCarro(request, response) {
	const { id } = request.params;
	try {
		const carro = await knex("carros").where({ id }).first();
		if (!carro) {
			return response.status(404).json({ mensagem: 'Carro não encontrado' });
		}
		return response.json(carro);
	} catch (error) {
		return response.status(500).json('Erro interno no servidor');
	}
}
async function cadastrarCarro(request, response) {
	const { modelo, marca, ano, cor, descricao } = request.body;
	try {
		const carro = await knex("carros").insert(
			[{ modelo, marca, ano, cor, descricao }],
			['*']
		);
		return response.status(201).json(carro);
	} catch (error) {
		return response.status(500).json('Erro interno no servidor');
	}
}
async function atualizarCarro(request, response) {
	const { id } = request.params;
	const { modelo, marca, ano, cor, descricao } = request.body;
	try {
		await knex("carros").where({ id }).update(
			{ modelo, marca, ano, cor, descricao }
		);
		return response.status(204).send();
	} catch (error) {
		return response.status(500).json('Erro interno no servidor');
	}
}
async function excluirCarro(request, response) {
	const { id } = request.params;
	try {
		const carro = await knex("carros").where({ id }).first();
		if (!carro) {
			return response.status(404).json({ mensagem: 'Carro não encontrado' });
		}
		await knex("carros").where({ id: id }).del();
		return response.status(204).send();
	} catch (error) {
		return response.status(500).json('Erro interno no servidor');
	}
}
export {
	listarCarros,
	detalharCarro,
	cadastrarCarro,
	atualizarCarro,
	excluirCarro,
};