export class DataNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DataNotFoundError";
  }
}

export class DataValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DataValidationError";
  }
}
