import { FastifyRequest } from "fastify";

export interface IService<T> {
	all(): Promise<T[] | null>;
	save(data: T): Promise<T>;
	fetch(id: number): Promise<T | null>;
	update(data: T): Promise<T>;
	delete(id: number): Promise<T>;
}