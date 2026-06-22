const { validateFromAccountId } = require('./validateFromAccountId.service');
const { validateToAccountId } = require('./validateToAccountId.service');
const { validateAmount } = require('./validateAmount.service');
const { usersDb, executeTransferHistory } = require('./save.service');
const { notifyUserOfTransfer } = require('./notification.service');

/**
 * Servicio monolítico que procesa una transferencia bancaria.
 * VIOLACIÓN CRÍTICA DE SRP (Single Responsibility Principle):
 * 1. Valida el estado de saldos y la existencia del usuario consultando el array directamente.
 * 2. Realiza la deducción/cálculo matemático de saldo directamente.
 * 3. Escribe y formatea manualmente la transacción para el historial.
 * 4. Envía un correo simulado mediante console.log con lógica de negocio incrustada.
 */


function executeTransfer(fromAccountId, toAccountId, amount) {
  // --- RESPONSABILIDAD 1: Validación y Reglas de Negocio en la Base de Datos Local ---
  const sender = validateFromAccountId(fromAccountId);

  const receiver = validateToAccountId(toAccountId);

  validateAmount(amount);

  // --- RESPONSABILIDAD 2: Deducción y Actualización de Cuenta ---
  sender.balance -= amount;
  receiver.balance += amount;

  // --- RESPONSABILIDAD 3: Escritura manual del registro de transferencia ---
  const transactions = executeTransferHistory(fromAccountId, toAccountId, amount); 

  // --- RESPONSABILIDAD 4: Envío simulado de correo electrónico ---
  notifyUserOfTransfer(sender);

  return {
    success: true,
    message: 'Transferencia ejecutada con éxito',
    transaction: transactions,
    balanceRestante: sender.balance
  };
}

/**
 * Obtiene el saldo actual de una cuenta.
 */
function getAccountBalance(accountId) {
  const account = usersDb.find(u => u.accountAlpha === accountId);
  if (!account) {
    throw new Error(`La cuenta '${accountId}' no existe.`);
  }
  return {
    accountId: account.accountAlpha,
    email: account.email,
    balance: account.balance
  };
}



module.exports = {
  executeTransfer,
  getAccountBalance,
  usersDb,
};
