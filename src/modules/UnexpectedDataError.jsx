class UnexpectedDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnexpectedDataError';
  }
}

export default UnexpectedDataError;
