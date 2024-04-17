import { FastifyInstance } from "fastify";
import { IResource } from "../controllers/IResource";

export function resource(fastify: FastifyInstance, basePath: string, resource: IResource) {
	const functions = Object.getOwnPropertyNames(Object.getPrototypeOf(resource));
	for (const fn of functions) {
		switch (fn) {
			case 'index':
				fastify.get(`/${basePath}`, resource.index);
				break;
			case 'store':
				fastify.post(`/${basePath}`, resource.store);
				break;
			case 'show':
				fastify.get(`/${basePath}/:id`, resource.show);
				break;
			case 'update':
				fastify.put(`/${basePath}/:id`, resource.update);
				fastify.patch(`/${basePath}/:id`, resource.update);
				break;
			case 'destroy':
				fastify.delete(`/${basePath}/:id`, resource.destroy);
				break;
		}
	}
}