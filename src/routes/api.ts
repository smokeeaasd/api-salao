import { FastifyInstance } from "fastify";
import { resource } from "../utils/resource";
import UserController from "../controllers/UserController";
import ProfessionalController from "../controllers/ProfessionalController";
import SchedulingController from "../controllers/SchedulingController";

export default async function apiRoutes(fastify: FastifyInstance) {
	fastify.register((instance, opts, done) => {
		resource(instance, "users", new UserController);
		resource(instance, "professionals", new ProfessionalController);
		resource(instance, "schedulings", new SchedulingController);

		done();
	}, {
		prefix: '/api'
	});
}