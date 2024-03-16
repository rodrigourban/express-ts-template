// global error handling
// can be called inside a controlled like this
// return next(new AppError("Invalid Email / Password / Method", 404));

export class AppError extends Error {
  statusCode: number;
  status: string;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode < 500 ? "error" : "fail";

    Error.captureStackTrace(this, this.constructor);
  }
}
