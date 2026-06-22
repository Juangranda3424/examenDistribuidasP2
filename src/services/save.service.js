// SIMULACIÓN DE UNA BASE DE DATOS EN MEMORIA (Estado global/local)
const usersDb = [
  { id: 'usr_001', email: 'estudiante.alpha@espe.edu.ec', accountAlpha: 'ACC-12345', balance: 1500.00 },
  { id: 'usr_002', email: 'docente.beta@espe.edu.ec', accountAlpha: 'ACC-67890', balance: 350.50 }
];

const transactionsHistory = [];


function executeTransferHistory(fromAccountId, toAccountId, amount) {
    const newTransaction = {
        transactionId: `TX-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        from: fromAccountId,
        to: toAccountId,
        amount: amount,
        status: 'COMPLETED',
        timestamp: new Date().toISOString()
      };
    transactionsHistory.push(newTransaction);

    return newTransaction;
    
}

exports = {
    executeTransferHistory,
    usersDb

};