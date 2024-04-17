export interface UserFillable {
	id?: number,
	name: string,
	email: string
}

export interface ProfessionalFillable {
	id?: number,
	name: string,
	email: string
}

export interface SchedulingFillable {
	id?: number,

	userId: number,
	professionalId: number,

	date: Date
}