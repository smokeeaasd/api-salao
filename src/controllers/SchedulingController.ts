import { FastifyBaseLogger, FastifyReply, FastifyRequest, FastifySchema, FastifyTypeProviderDefault, RawServerDefault, RouteGenericInterface } from "fastify";
import { ResolveFastifyRequestType } from "fastify/types/type-provider";
import { IncomingMessage, ServerResponse } from "http";
import { IResource } from "./IResource";
import SchedulingModel from "../models/Scheduling";
import { SchedulingFillable } from "../models/fillables";
export default class SchedulingController implements IResource {
	async index(request: FastifyRequest<RouteGenericInterface, RawServerDefault, IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<FastifyTypeProviderDefault, FastifySchema, RouteGenericInterface>>, reply: FastifyReply<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, RouteGenericInterface, unknown, FastifySchema, FastifyTypeProviderDefault, unknown>) {
		const schedulings = await SchedulingModel.all();

		return reply.status(200).send(schedulings);
	}
	async store(request: FastifyRequest<RouteGenericInterface, RawServerDefault, IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<FastifyTypeProviderDefault, FastifySchema, RouteGenericInterface>>, reply: FastifyReply<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, RouteGenericInterface, unknown, FastifySchema, FastifyTypeProviderDefault, unknown>) {
		const body = request.body as SchedulingFillable;

		console.log(body);
		const model = new SchedulingModel({
			userId: body.userId,
			professionalId: body.professionalId,
			date: body.date
		});

		const scheduling = await model.save();

		return reply.status(200).send(scheduling);
	}

	async show(request: FastifyRequest<RouteGenericInterface, RawServerDefault, IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<FastifyTypeProviderDefault, FastifySchema, RouteGenericInterface>>, reply: FastifyReply<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, RouteGenericInterface, unknown, FastifySchema, FastifyTypeProviderDefault, unknown>) {
		const params = request.params as { id: string }
		const scheduling = await SchedulingModel.fetch(Number.parseInt(params.id));

		return reply.status(200).send(scheduling);
	}

	async update(request: FastifyRequest<RouteGenericInterface, RawServerDefault, IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<FastifyTypeProviderDefault, FastifySchema, RouteGenericInterface>>, reply: FastifyReply<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, RouteGenericInterface, unknown, FastifySchema, FastifyTypeProviderDefault, unknown>) {
		const body = request.body as SchedulingFillable;
		const params = request.params as { id: string };

		const scheduling = await SchedulingModel.fetch(Number.parseInt(params.id))
		if (scheduling != null) {
			const newScheduling = new SchedulingModel(scheduling);

			newScheduling.userId = body.userId ?? newScheduling.userId;
			newScheduling.professionalId = body.professionalId ?? newScheduling.professionalId;

			const updated = await newScheduling.update();

			return reply.status(200).send(updated);
		}
	}
	async destroy(request: FastifyRequest<RouteGenericInterface, RawServerDefault, IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<FastifyTypeProviderDefault, FastifySchema, RouteGenericInterface>>, reply: FastifyReply<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, RouteGenericInterface, unknown, FastifySchema, FastifyTypeProviderDefault, unknown>) {
		const params = request.params as { id: string };

		const scheduling = await SchedulingModel.fetch(Number.parseInt(params.id))
		if (scheduling != null) {
			const newScheduling = new SchedulingModel(scheduling);

			const updated = await newScheduling.delete();

			return reply.status(200).send(updated);
		}
	}
}