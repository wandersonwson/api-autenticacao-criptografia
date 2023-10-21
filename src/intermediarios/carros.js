import { default as knex } from "../dados/conexao.js";

async function validarDadosCarro(request, response, next) {
    const { modelo, marca, ano, cor } = request.body;
    if (!modelo || !marca || !ano || !cor) {
        return response.status(400).json({ mensagem: "Os campos modelo, marca, ano e cor são obrigatórios" });
    }
    next();
}
async function validarAtualizacaoCarro(request, response, next) {
    const { id } = request.params;
    const { modelo, marca, ano, cor } = request.body;
    if (!modelo || !marca || !ano || !cor) {
        return response.status(400).json({ mensagem: "Os campos modelo, marca, ano e cor são obrigatórios" });
    }
    try {
        const carro = await knex("carros").where({ id: id }).first();
        if (!carro) {
            return response.status(404).json({ mensagem: 'Carro não encontrado' });
        }
    } catch (error) {
        return response.status(500).json({ mensagem: "Erro interno no servidor" });
    }
    next();
}

export { validarDadosCarro, validarAtualizacaoCarro };