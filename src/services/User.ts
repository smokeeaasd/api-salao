import { prisma } from "../lib/prisma";
import { UserFillable } from "../models/fillables";
import { IService } from "./IService";
import { User } from "@prisma/client";

export default class UserService implements IService<User> {
	async all(): Promise<User[]> {
		try {
			const user = await prisma.user.findMany({
				include: {
					schedules: true
				}
			});
			return user;
		} catch (err: any) {
			throw new Error(`Failed to list users: ${err.message}`);
		}
	}

	async save(data: UserFillable): Promise<User> {
		try {
			const user = await prisma.user.create({
				data: {
					name: data.name,
					email: data.email
				}
			});
			return user
		} catch (err: any) {
			throw new Error(`Failed to create user: ${err.message}`);
		}
	}
	async fetch(id: number): Promise<User | null> {
		try {
			const user = await prisma.user.findUnique({
				where: {
					id: id
				},
				include: {
					schedules: true
				}
			});

			return user;
		} catch (err: any) {
			throw new Error(`Failed to show user: ${err.message}`);
		}
	}
	async update(data: UserFillable): Promise<User> {
		try {
			const user = await prisma.user.update({
				data: {
					name: data.name,
					email: data.email,
				},
				where: {
					id: data.id
				}
			});

			return user
		} catch (err: any) {
			throw new Error(`Failed to update user: ${err.message}`);
		}
	}
	async delete(id: number): Promise<User> {
		
		try {
			const user = await prisma.user.delete({
				where: {
					id: id
				}
			});

			return user;
		} catch (err: any) {
			throw new Error(`Failed to delete user: ${err.message}`);
		}
	}
}