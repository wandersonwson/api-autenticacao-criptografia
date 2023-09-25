import knex from "knex";
const database = knex({
	client: 'pg',
	connection: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		password: process.env.DB_KEY,
		database: process.env.DB_NAME,
		ssl: { rejectUnauthorized: false }
	}
});
export default database;