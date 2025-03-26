class CustomError extends Error {
    statusCode: number;
    
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.name = this.constructor.name;
    }
  }
  
  class BadRequestError extends CustomError {
    constructor(message: string) {
      super(message, 400);
    }
  }
  
  class UnauthorizedError extends CustomError {
    constructor(message: string) {
      super(message, 401);
    }
  }
  
  class NotFoundError extends CustomError {
    constructor(message: string) {
      super(message, 404);
    }
  }
  
  class InternalServerError extends CustomError {
    constructor(message: string) {
      super(message, 500);
    }
  }
  
  export { CustomError, BadRequestError, UnauthorizedError, NotFoundError, InternalServerError };
  