export default interface IModel<T> {
	save(): 	Promise<T | null>;
	update(): Promise<T | null>;
	delete(): Promise<T | null>;
}