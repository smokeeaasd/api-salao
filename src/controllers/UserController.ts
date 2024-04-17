import { FastifyBaseLogger, FastifyReply, FastifyRequest, FastifySchema, FastifyTypeProviderDefault, RawServerDefault, RouteGenericInterface } from "fastify";
import { ResolveFastifyRequestType } from "fastify/types/type-provider";
import { IncomingMessage, ServerResponse } from "http";
import { IResource } from "./IResource";
import UserModel from "../models/User";
import { UserFillable } from "../models/fillables";
export default class UserController implements IResource {

	async index(request: FastifyRequest<RouteGenericInterface, RawServerDefault, IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<FastifyTypeProviderDefault, FastifySchema, RouteGenericInterface>>, reply: FastifyReply<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, RouteGenericInterface, unknown, FastifySchema, FastifyTypeProviderDefault, unknown>) {
		const users = await UserModel.all();

		return reply.status(200).send(users);
	}
	async store(request: FastifyRequest<RouteGenericInterface, RawServerDefault, IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<FastifyTypeProviderDefault, FastifySchema, RouteGenericInterface>>, reply: FastifyReply<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, RouteGenericInterface, unknown, FastifySchema, FastifyTypeProviderDefault, unknown>) {
		const body = request.body as UserFillable;
		const model = new UserModel({
			name: body.name,
			email: body.email
		});

		const user = await model.save();

		return reply.status(200).send(user);
	}

	async show(request: FastifyRequest<RouteGenericInterface, RawServerDefault, IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<FastifyTypeProviderDefault, FastifySchema, RouteGenericInterface>>, reply: FastifyReply<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, RouteGenericInterface, unknown, FastifySchema, FastifyTypeProviderDefault, unknown>) {
		const params = request.params as { id: string }
		const user = await UserModel.fetch(Number.parseInt(params.id));

		return reply.status(200).send(user);
	}

	async update(request: FastifyRequest<RouteGenericInterface, RawServerDefault, IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<FastifyTypeProviderDefault, FastifySchema, RouteGenericInterface>>, reply: FastifyReply<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, RouteGenericInterface, unknown, FastifySchema, FastifyTypeProviderDefault, unknown>) {
		const body = request.body as UserFillable;
		const params = request.params as { id: string };

		const user = await UserModel.fetch(Number.parseInt(params.id))
		if (user != null) {
			const newUser = new UserModel(user);

			newUser.name = body.name ?? newUser.name;
			newUser.email = body.email ?? newUser.email;

			const updated = await newUser.update();

			return reply.status(200).send(updated);
		}
	}
	async destroy(request: FastifyRequest<RouteGenericInterface, RawServerDefault, IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<FastifyTypeProviderDefault, FastifySchema, RouteGenericInterface>>, reply: FastifyReply<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, RouteGenericInterface, unknown, FastifySchema, FastifyTypeProviderDefault, unknown>) {
		const params = request.params as { id: string };

		const user = await UserModel.fetch(Number.parseInt(params.id))
		if (user != null) {
			const newUser = new UserModel(user);

			const updated = await newUser.delete();

			return reply.status(200).send(updated);
		}
	}
}