class DataSaveError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DataSaveError';
  }
}

export default DataSaveError;
