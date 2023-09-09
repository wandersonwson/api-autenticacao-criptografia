import pool from "../dados/conexao.js";
import jwt from "jsonwebtoken";
import chave from "../autenticacao/chaveJWT.js";
async function validarUsuarioLogado(request, response, next) {
    const { authorization } = request.headers;
    if (!authorization) {
        return response.status(401).json({mensagem: "Um token válido precisa ser informado para acesso ao recurso."});
    }
    const token = authorization.split(" ")[1];
    try {
        const { id } = jwt.verify(token, chave);
        const { rowCount } = await pool.query("select * from usuarios where id = $1", [id]);
        if (rowCount < 1) {
            return response.status(401).json({mensagem: "Um token válido precisa ser informado para acesso ao recurso."});        
        }
    } catch (error) {
        return response.status(401).json({mensagem: "Um token válido precisa ser informado para acesso ao recurso."});
    }
    next();
}
export default validarUsuarioLogado;