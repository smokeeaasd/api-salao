import fastify from "fastify";
import apiRoutes from "./routes/api";

const app = fastify({
	logger: true,
});

app.register(apiRoutes);

export default app;