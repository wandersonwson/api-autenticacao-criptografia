import pool from "../dados/conexao.js";
async function validarDadosCarro(request, response, next) {
    const { modelo, marca, ano, cor, descricao } = request.body;
    if (!modelo || !marca || !ano || !cor || !descricao) {
        return response.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
    }
    next();
}
async function validarAtualizacaoCarro(request, response, next) {
    const { modelo, marca, ano, cor, descricao } = request.body;
    if (!modelo || !marca || !ano || !cor || !descricao) {
        return response.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
    }
    try {
        const { rowCount } = await pool.query('select * from carros where id = $1', [id]);
        if (rowCount < 1) {
            return response.status(404).json({ mensagem: 'Carro não encontrado' });
        }
    } catch (error) {
        return response.status(500).json({ mensagem: "Erro interno no servidor" });
    }
}
export { validarDadosCarro, validarAtualizacaoCarro };