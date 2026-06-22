function validateToAccountId(toAccountId) {
  const receiver = usersDb.find(u => u.accountAlpha === toAccountId);
  if (!receiver) {
    throw new Error(`Error de validación: La cuenta destino '${toAccountId}' no existe en la base de datos.`);
  }
  return receiver;
}


exports = {
  validateToAccountId
};