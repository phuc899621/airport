export class BaseError extends Error {
  constructor({ type = "Server Error", status = 500, detail = null} = {}) {
    super();  
    this.type = type;      
    this.status = status;   
    this.detail = detail; 
    this.name = this.constructor.name;
  }

  toJSON() {
    return {
      type: this.type,
      detail: this.detail?.message || this.detail || null,
    };
  }
}

export class HTTPError extends BaseError {
    constructor(status, type, detail) {
        super({status, type, detail});
    }
}

export class DBError extends BaseError {
    constructor(detail) {
        super({type: "Database Error", detail});
    }
}

export class ValidationError extends BaseError {
    constructor(detail) {
        super({type: "Validation Error", detail, status: 400});
    }
}

export class AuthenticationError extends BaseError {
    constructor(detail) {
        super({type: "Authentication Error", detail, status: 401});
    }
}

export class NotFoundError extends BaseError {
    constructor(detail) {
        super({type: "Not Found Error", detail, status: 404});
    }
}
export class ConflictError extends BaseError {
    constructor(detail) {
        super({type: "Conflict Error", detail, status: 409});
    }
}

export class EmailError extends BaseError {
    constructor(detail) {
        super({type: "Email Error", detail, status: 502});
    }
}

export class ForbiddenError extends BaseError {
    constructor(detail) {
        super({type: "Forbidden Error", detail, status: 403});
    }
}
