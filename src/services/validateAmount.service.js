function validateAmount(amount) {
  if (amount <= 0) {
    throw new Error('Error de validación: El monto a transferir debe ser mayor a cero.');
  }
  return amount;
}

exports = {
  validateAmount
};