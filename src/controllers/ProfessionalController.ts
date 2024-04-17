import { FastifyBaseLogger, FastifyReply, FastifyRequest, FastifySchema, FastifyTypeProviderDefault, RawServerDefault, RouteGenericInterface } from "fastify";
import { ResolveFastifyRequestType } from "fastify/types/type-provider";
import { IncomingMessage, ServerResponse } from "http";
import { IResource } from "./IResource";
import ProfessionalModel from "../models/Professional";
import { ProfessionalFillable } from "../models/fillables";
export default class ProfessionalController implements IResource {

	async index(request: FastifyRequest<RouteGenericInterface, RawServerDefault, IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<FastifyTypeProviderDefault, FastifySchema, RouteGenericInterface>>, reply: FastifyReply<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, RouteGenericInterface, unknown, FastifySchema, FastifyTypeProviderDefault, unknown>) {
		const professionals = await ProfessionalModel.all();

		return reply.status(200).send(professionals);
	}
	async store(request: FastifyRequest<RouteGenericInterface, RawServerDefault, IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<FastifyTypeProviderDefault, FastifySchema, RouteGenericInterface>>, reply: FastifyReply<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, RouteGenericInterface, unknown, FastifySchema, FastifyTypeProviderDefault, unknown>) {
		const body = request.body as ProfessionalFillable;
		const model = new ProfessionalModel({
			name: body.name,
			email: body.email
		});

		const professional = await model.save();

		return reply.status(200).send(professional);
	}

	async show(request: FastifyRequest<RouteGenericInterface, RawServerDefault, IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<FastifyTypeProviderDefault, FastifySchema, RouteGenericInterface>>, reply: FastifyReply<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, RouteGenericInterface, unknown, FastifySchema, FastifyTypeProviderDefault, unknown>) {
		const params = request.params as { id: string }
		const professional = await ProfessionalModel.fetch(Number.parseInt(params.id));

		return reply.status(200).send(professional);
	}

	async update(request: FastifyRequest<RouteGenericInterface, RawServerDefault, IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<FastifyTypeProviderDefault, FastifySchema, RouteGenericInterface>>, reply: FastifyReply<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, RouteGenericInterface, unknown, FastifySchema, FastifyTypeProviderDefault, unknown>) {
		const body = request.body as ProfessionalFillable;
		const params = request.params as { id: string };

		const professional = await ProfessionalModel.fetch(Number.parseInt(params.id))
		if (professional != null) {
			const newProfessional = new ProfessionalModel(professional);

			newProfessional.name = body.name ?? newProfessional.name;
			newProfessional.email = body.email ?? newProfessional.email;

			const updated = await newProfessional.update();

			return reply.status(200).send(updated);
		}
	}
	async destroy(request: FastifyRequest<RouteGenericInterface, RawServerDefault, IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<FastifyTypeProviderDefault, FastifySchema, RouteGenericInterface>>, reply: FastifyReply<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, RouteGenericInterface, unknown, FastifySchema, FastifyTypeProviderDefault, unknown>) {
		const params = request.params as { id: string };

		const professional = await ProfessionalModel.fetch(Number.parseInt(params.id))
		if (professional != null) {
			const newProfessional = new ProfessionalModel(professional);

			const updated = await newProfessional.delete();

			return reply.status(200).send(updated);
		}
	}

	async getSchedulings(request: FastifyRequest<RouteGenericInterface, RawServerDefault, IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<FastifyTypeProviderDefault, FastifySchema, RouteGenericInterface>>, reply: FastifyReply<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, RouteGenericInterface, unknown, FastifySchema, FastifyTypeProviderDefault, unknown>) {
		const params = request.params as { id: string };

		const professional = await ProfessionalModel.fetch(Number.parseInt(params.id))
		if (professional != null) {
			const newProfessional = new ProfessionalModel(professional);

			const updated = await newProfessional.delete();

			return reply.status(200).send(updated);
		}
	}
}