import app from "./app";

process.env.TZ = 'America/Sao_Paulo';

const PORT = Number(process.env.PORT) || 3000;

async function main() {
	try {
		await app.listen({
			port: PORT,
			host: '127.0.0.1'
		});
	} catch (error: any) {
		console.error(`Error at server start: ${error.message}`)
		process.exit(1);
	}
}

main();