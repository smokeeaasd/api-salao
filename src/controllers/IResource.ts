import { FastifyReply, FastifyRequest } from "fastify";

export interface IResource {
	index(request: FastifyRequest, reply: FastifyReply): any
	store(request: FastifyRequest, reply: FastifyReply): any
	show(request: FastifyRequest, reply: FastifyReply): any
	update(request: FastifyRequest, reply: FastifyReply): any
	destroy(request: FastifyRequest, reply: FastifyReply): any
}