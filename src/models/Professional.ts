import { Professional } from "@prisma/client";
import IModel from "./IModel";
import ProfessionalService from "../services/Professional";
import { ProfessionalFillable } from "./fillables";

export default class ProfessionalModel implements IModel<Professional> {
	public id?: number;
	public name: string;
	public email: string;

	constructor(professional: ProfessionalFillable) {
		this.id = professional.id;
		this.name = professional.name;
		this.email = professional.email;
	}

	public static async fetch(id: number): Promise<Professional | null> {
		const service = new ProfessionalService;

		const professional = await service.fetch(id);

		return professional;
	}

	public static async all() {
		const service = new ProfessionalService;

		const users = await service.all();

		return users;
	}

	public async save(): Promise<Professional> {
		const service = new ProfessionalService;

		const professional = await service.save({
			name: this.name,
			email: this.email
		});

		return professional as Professional;
	}

	public async update(): Promise<Professional | null> {
		const service = new ProfessionalService;
		if (this.id != null) {
			const professional = await service.update({
				id: this.id,
				name: this.name,
				email: this.email
			});

			return professional;
		}

		return null;
	}

	public async delete(): Promise<Professional | null> {
		const service = new ProfessionalService;
		if (this.id != null && (await service.fetch(this.id)) != null) {
			const professional = await service.delete(this.id);
			return professional;
		}
		return null;
	}
}