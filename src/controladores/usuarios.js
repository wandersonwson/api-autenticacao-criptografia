import { default as knex } from "../dados/conexao.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const chave = process.env.JWT_KEY;
async function listarUsuarios(request, response) {
    try {
        const usuarios = await knex("usuarios").select("id", "nome", "email").orderBy("id");
        return response.status(200).json(usuarios);
    } catch (error) {
        response.status(500).json({ mensagem: "Erro interno no servidor" });
    }
}
async function cadastrarUsuario(request, response) {
    const { nome, email, senha } = request.body;
    try {
        const senhaCifrada = await bcrypt.hash(senha, 10);
        const novoUsuario = await knex("usuarios").returning("*").insert(
            [{nome: nome, email: email, senha: senhaCifrada}]
        );
        return response.status(201).json(novoUsuario);
    } catch (error) {
        response.status(500).json({ mensagem: "Erro interno no servidor" });
    }
}
async function detalharUsuario(request, response) {
    const { id } = request.params;
    try {
        const usuario = await knex("usuarios").where({ id: id }).select("id", "nome", "email").first();
        if (!usuario) {
            return response.status(404).json({ mensagem: "Usuário não encontrado" });
        } else {
            return response.status(200).json(usuario);
        }
    } catch (error) {
        response.status(500).json({ mensagem: "Erro interno no servidor" });
    }
}
async function login(request, response) {
    const { email, senha } = request.body;
    try {
        const usuario = await knex("usuarios").where({ email: email }).first();
        if (!usuario) {
            return response.status(400).json({ mensagem: "Email ou senha inválidos" });
        }
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return response.status(400).json({ mensagem: "Email ou senha inválidos" });
        }
        const token = jwt.sign({ id: usuario.id }, chave, { expiresIn: "8h" });
        const { senha: cifra, ...usuarioLogado } = usuario;
        return response.json({ usuario: usuarioLogado, token });
    } catch (error) {
        response.status(500).json({ mensagem: "Erro interno no servidor" });
    }
}
export { listarUsuarios, cadastrarUsuario, detalharUsuario, login };