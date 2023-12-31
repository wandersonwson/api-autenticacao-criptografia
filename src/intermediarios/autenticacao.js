import { default as knex } from "../dados/conexao.js";
import jwt from "jsonwebtoken";
const chave = process.env.JWT_KEY;

async function validarUsuarioLogado(request, response, next) {
    const { authorization } = request.headers;
    if (!authorization) {
        return response.status(401).json({ mensagem: "Um token válido precisa ser informado para acesso ao recurso." });
    }
    const token = authorization.split(" ")[1];
    try {
        const { id } = jwt.verify(token, chave);
        const usuario = await knex("usuarios").where({ id: id }).first();
        if (!usuario) {
            return response.status(401).json({ mensagem: "Um token válido precisa ser informado para acesso ao recurso." });
        }
    } catch (error) {
        return response.status(401).json({ mensagem: "Um token válido precisa ser informado para acesso ao recurso." });
    }
    next();
}

export default validarUsuarioLogado;