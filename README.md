### Autenticação e Criptografia #PotenciaTech

Neste projeto foram colocados em prática os conceitos de cripitografia e autenticação, através da criptografia de senhas e da validação de tokens para acesso a determinadas rotas da API.

#### Rotas

Sem autenticação:
- Cadastro de um usuário (POST /usuario);
- Login (POST /login).

Com autenticação:
- Listagem de usuários (GET /usuario);
- Perfil do usuário (GET /usuario/:id);
- Cadastro de um carro (POST /carro);
- Listagem de carros (GET /carro);
- Detalhes do carro (GET /carro/:id);
- Atualização de um carro (PUT /carro/:id);
- Exclusão de um carro (DELETE /carro/:id).

#### Bibliotecas

- Servidor: [Express](https://www.npmjs.com/package/express);
- Criptografia: [Bcrypt](https://www.npmjs.com/package/bcrypt);
- Autenticação: [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken);
- Banco de dados: [PG](https://www.npmjs.com/package/pg);
- QueryBuilder: [Knex](https://www.npmjs.com/package/knex).