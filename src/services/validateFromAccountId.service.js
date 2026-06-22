function validateFromAccountId(fromAccountId) {
  const sender = usersDb.find(u => u.accountAlpha === fromAccountId);
  if (!sender) {
    throw new Error(`Error de validación: La cuenta origen '${fromAccountId}' no existe en la base de datos.`);
  }

  if (sender.balance < amount) {
    throw new Error(`Saldo insuficiente: La cuenta '${fromAccountId}' tiene $${sender.balance}, requiere $${amount}.`);
  }

  return sender;
};

exports = {
  validateFromAccountId
};