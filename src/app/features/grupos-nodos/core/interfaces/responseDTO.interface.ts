export interface ResponseDTO<T> {
    hasError: boolean;
    message: string;
    data: T;
    statusCode: number;
}