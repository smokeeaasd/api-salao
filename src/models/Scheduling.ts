import { Scheduling } from "@prisma/client";
import IModel from "./IModel";
import SchedulingService from "../services/Scheduling";
import { SchedulingFillable } from "./fillables";

export default class SchedulingModel implements IModel<Scheduling> {
	public id?: number;
	public userId: number;
	public professionalId: number;
	public date: Date;

	constructor(scheduling: SchedulingFillable) {
		this.id = scheduling.id;
		this.userId = scheduling.userId;
		this.professionalId = scheduling.professionalId;
		this.date = scheduling.date;
	}

	public static async fetch(id: number): Promise<Scheduling | null> {
		const service = new SchedulingService;

		const scheduling = await service.fetch(id);

		return scheduling;
	}

	public static async all() {
		const service = new SchedulingService;

		const users = await service.all();

		return users;
	}

	public async save(): Promise<Scheduling> {
		const service = new SchedulingService;

		const scheduling = await service.save({
			userId: this.userId,
			professionalId: this.professionalId,
			date: this.date,
		});

		return scheduling as Scheduling;
	}

	public async update(): Promise<Scheduling | null> {
		const service = new SchedulingService;
		if (this.id != null) {
			const scheduling = await service.update({
				id: this.id,
				userId: this.userId,
				professionalId: this.professionalId,
				date: this.date,
			});

			return scheduling;
		}

		return null;
	}

	public async delete(): Promise<Scheduling | null> {
		const service = new SchedulingService;
		if (this.id != null && (await service.fetch(this.id)) != null) {
			const scheduling = await service.delete(this.id);
			return scheduling;
		}
		return null;
	}
}