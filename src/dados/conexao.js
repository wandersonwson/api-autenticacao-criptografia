import pg from 'pg';
const pool = new pg.Pool({
	host: 'localhost',
	port: 5432,
	user: 'postgres',
	password: 'wsa93otl',
	database: 'autenticacao_criptografia',
});
export default pool;