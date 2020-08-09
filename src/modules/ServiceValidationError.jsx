class ServiceValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ServiceValidationError';
  }
}

export default ServiceValidationError;
