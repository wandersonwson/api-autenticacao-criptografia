import knex from "knex";
const database = knex({
	client: 'pg',
	connection: {
		host: 'localhost',
		port: 5432,
		user: 'postgres',
		password: 'wsa93otl',
		database: 'autenticacao_criptografia'
	}
});
export default database;