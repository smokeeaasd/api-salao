import { Scheduling } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { IService } from "./IService";
import { SchedulingFillable } from "../models/fillables";

export default class SchedulingService implements IService<Scheduling> {
	async all(): Promise<Scheduling[]> {
		try {
			const schedulings = await prisma.scheduling.findMany();
			return schedulings;
		} catch (err: any) {
			throw new Error(`Failed to list schedulings: ${err.message}`);
		}
	}

	async save(data: SchedulingFillable): Promise<Scheduling> {
		try {
			const scheduling = await prisma.scheduling.create({
				data: {
					date: data.date!,
					professional: {
						connect: {
							id: data.professionalId
						}
					},
					user: {
						connect: {
							id: data.userId
						}
					}
				}
			});
			return scheduling
		} catch (err: any) {
			throw new Error(`Failed to create scheduling: ${err.message}`);
		}
	}
	async fetch(id: number): Promise<Scheduling | null> {
		try {
			const scheduling = await prisma.scheduling.findUnique({
				where: {
					id: id,
				}
			});

			return scheduling;
		} catch (err: any) {
			throw new Error(`Failed to show scheduling: ${err.message}`);
		}
	}
	async update(data: SchedulingFillable): Promise<Scheduling> {
		try {
			const scheduling = await prisma.scheduling.update({
				data: {
					professional: {
						connect: {
							id: data.professionalId
						},
					},
					user: {
						connect: {
							id: data.userId
						}
					}
				},
				where: {
					id: data.id
				}
			});

			return scheduling
		} catch (err: any) {
			throw new Error(`Failed to update scheduling: ${err.message}`);
		}
	}
	async delete(id: number): Promise<Scheduling> {
		try {
			const scheduling = await prisma.scheduling.delete({
				where: {
					id: id
				}
			});

			return scheduling;
		} catch (err: any) {
			throw new Error(`Failed to delete scheduling: ${err.message}`);
		}
	}
}