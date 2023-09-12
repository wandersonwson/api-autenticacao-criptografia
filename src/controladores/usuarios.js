import pool from "../dados/conexao.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import chave from "../autenticacao/chaveJWT.js";
async function listarUsuarios(request, response) {
    try {
        const { rows } = await pool.query("select id, nome, email from usuarios");
        return response.status(200).json(rows);
    } catch (error) {
        response.status(500).json({mensagem: "Erro interno no servidor"});
    }
}
async function cadastrarUsuario(request, response) {
    const { nome, email, senha } = request.body;
    try {
        const senhaCifrada = await bcrypt.hash(senha, 10);
        const novoUsuario = await pool.query(
            "insert into usuarios (nome, email, senha) values ($1, $2, $3) returning *",
            [nome, email, senhaCifrada]
        );
        return response.status(201).json(novoUsuario.rows[0]);
    } catch (error) {
        response.status(500).json({mensagem: "Erro interno no servidor"});
    }
}
async function detalharUsuario(request, response) {
    const { id } = request.params;
    try {
        const { rows, rowCount } = await pool.query("select id, nome, email from usuarios where id = $1", [Number(id)]);
        if(rowCount < 1) {
            return response.status(404).json({mensagem: "Usuário não encontrado"});
        } else {
            return response.status(200).json(rows[0]);
        }
    } catch (error) {
        response.status(500).json({mensagem: "Erro interno no servidor"});
    }
}
async function login(request, response) {
    const { email, senha } = request.body;
    try {
        const { rows, rowCount } = await pool.query("select * from usuarios where email = $1", [email]);
        if(rowCount < 1) {
            return response.status(400).json({mensagem: "Email ou senha inválidos"});
        }
        const senhaValida = await bcrypt.compare(senha, rows[0].senha);
        if(!senhaValida) {
            return response.status(400).json({mensagem: "Email ou senha inválidos"});
        }
        const token = jwt.sign({id: rows[0].id}, chave, {expiresIn: "8h"});
        const {senha: cifra, ...usuario} = rows[0];
        return response.json({usuario: usuario, token});
    } catch (error) {
        response.status(500).json({mensagem: "Erro interno no servidor"});
    }
}
export { listarUsuarios, cadastrarUsuario, detalharUsuario, login };