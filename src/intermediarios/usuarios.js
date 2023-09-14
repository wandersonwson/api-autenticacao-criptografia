import { default as knex } from "../dados/conexao.js";
function validarDadosLogin(request, response, next) {
    const { email, senha } = request.body;
    if (!email || !senha) {
        response.status(400).json({mensagem: "Todos os campos são obrigatórios"});
    }
    next()
}
async function validarDadosUsuario(request, response, next) {
    const { nome, email, senha } = request.body;
    if (!nome || !email || !senha) {
        response.status(400).json({mensagem: "Todos os campos são obrigatórios"});
    }
    try {
        const usuario = await knex("usuarios").where({ email: email }).first();
        if(usuario) {
            response.status(400).json({mensagem: "Já existe um usuário cadastrado com o email infromado"});
        }
    } catch (error) {
        response.status(500).json({mensagem: "Erro interno no servidor"});
    }
    next();
}
export { validarDadosLogin, validarDadosUsuario };