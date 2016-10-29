export class HttpError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
    this.stack = (new Error()).stack;
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends HttpError {
  constructor(message) {
    super(message || 'Not Found', 404);
  }
}
