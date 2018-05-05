export interface IArrayResult<T> {
    status: Number;
    data: T[]|null;
    error: Error|null;
}

export interface IResult<T> {
    status: Number;
    data: T|null;
    error: Error|null;
}