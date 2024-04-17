import { User } from "@prisma/client";
import UserService from "../services/User";
import IModel from "./IModel";
import { UserFillable } from "../models/fillables";

export default class UserModel implements IModel<User> {
	public id?: number;
	public name: string;
	public email: string;

	constructor(user: UserFillable) {
		this.id = user.id;
		this.name = user.name;
		this.email = user.email;
	}

	public static async fetch(id: number): Promise<User | null> {
		const service = new UserService;

		const user = await service.fetch(id);

		return user;
	}

	public static async all() {
		const service = new UserService;

		const users = await service.all();

		return users;
	}

	async save(): Promise<User> {
		const service = new UserService;

		const user = await service.save({
			name: this.name,
			email: this.email,
		});

		return user as User;
	}

	async update(): Promise<User | null> {
		const service = new UserService;
		if (this.id != null) {
			const user = await service.update({
				id: this.id,
				name: this.name,
				email: this.email
			});

			return user;
		}

		return null;
	}

	async delete(): Promise<User | null> {
		const service = new UserService;
		if (this.id != null && (await service.fetch(this.id)) != null) {
			const user = await service.delete(this.id);
			return user;
		}
		return null;
	}
}