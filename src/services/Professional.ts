import { Professional } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { ProfessionalFillable } from "../models/fillables";
import { IService } from "./IService";

export default class ProfessionalService implements IService<Professional> {
	async all(): Promise<Professional[]> {
		try {
			const pro = await prisma.professional.findMany({
				include: {
					schedules: true
				}
			});
			return pro;
		} catch (err: any) {
			throw new Error(`Failed to list professionals: ${err.message}`);
		}
	}

	async save(data: ProfessionalFillable): Promise<Professional> {
		try {
			const pro = await prisma.professional.create({
				data: {
					email: data.email,
					name: data.name
				}
			});
			return pro;
		} catch (err: any) {
			throw new Error(`Failed to create professional: ${err.message}`);
		}
	}
	async fetch(id: number): Promise<Professional | null> {
		try {
			const pro = await prisma.professional.findUnique({
				where: {
					id: id,
				},
				include: {
					schedules: true
				}
			});

			return pro;
		} catch (err: any) {
			throw new Error(`Failed to show professional: ${err.message}`);
		}
	}
	async update(data: ProfessionalFillable): Promise<Professional> {
		try {
			const pro = await prisma.professional.update({
				data: {
					email: data.email,
					name: data.name,
				},
				where: {
					id: data.id
				}
			});

			return pro
		} catch (err: any) {
			throw new Error(`Failed to update professional: ${err.message}`);
		}
	}
	async delete(id: number): Promise<Professional> {
		try {
			const pro = await prisma.professional.delete({
				where: {
					id: id
				}
			});

			return pro;
		} catch (err: any) {
			throw new Error(`Failed to delete professional: ${err.message}`);
		}
	}
}