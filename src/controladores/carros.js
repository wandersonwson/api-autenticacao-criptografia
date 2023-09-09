import pool from '../dados/conexao.js';
async function listarCarros(request, response) {
	try {
		const { rows } = await pool.query('select * from carros');
		return response.json(rows);
	} catch (error) {
		return response.status(500).json('Erro interno do servidor');
	}
}
async function detalharCarro(request, response) {
	const { id } = request.params;
	try {
		const { rows, rowCount } = await pool.query('select * from carros where id = $1', [id]);
		if (rowCount < 1) {
			return response.status(404).json({ mensagem: 'Carro não encontrado' });
		}
		return response.json(rows[0]);
	} catch (error) {
		return response.status(500).json('Erro interno do servidor');
	}
}
async function cadastrarCarro(request, response) {
	const { modelo, marca, ano, cor, descricao } = request.body;
	try {
		const { rows } = await pool.query(
			'insert into carros (modelo, marca, ano, cor, descricao) values ($1, $2, $3, $4, $5) returning *',
			[modelo, marca, ano, cor, descricao]
		);
		return response.status(201).json(rows[0]);
	} catch (error) {
		return response.status(500).json('Erro interno do servidor');
	}
}
async function atualizarCarro(request, response) {
	const { id } = request.params;
	const { modelo, marca, ano, cor, descricao } = request.body;
	try {
		const { rowCount } = await pool.query('select * from carros where id = $1', [id]);
		if (rowCount < 1) {
			return response.status(404).json({ mensagem: 'Carro não encontrado' });
		}
		await pool.query(
			'update carros set modelo = $1, marca = $2, ano = $3, cor = $4, descricao = $5 where id = $6',
			[modelo, marca, ano, cor, descricao, id]
		);
		return response.status(204).send();
	} catch (error) {
		return response.status(500).json('Erro interno do servidor');
	}
}
async function excluirCarro(request, response) {
	const { id } = request.params;
	try {
		const { rowCount } = await pool.query('select * from carros where id = $1', [id]);
		if (rowCount < 1) {
			return response.status(404).json({ mensagem: 'Carro não encontrado' });
		}
		await pool.query('delete from carros where id = $1', [id]);
		return response.status(204).send();
	} catch (error) {
		return response.status(500).json('Erro interno do servidor');
	}
}
export {
	listarCarros,
	detalharCarro,
	cadastrarCarro,
	atualizarCarro,
	excluirCarro,
};