import { accounts, transactions } from '../helper/utilities';


export const activateDeactivateAccount = (req, res) => {
    const account = accounts.find((r) => r.accountNumber === parseInt(req.params.accountNumber));
    if (!account) {
        return res.status(404).
        send('The account with the given ID was not found.');
    }
    account.requesting = req.body.requesting;
    account.accountNumber = req.body.accountNumber;
    account.status= req.body.status;
    res.send(account);
};

export const deleteBankAccount = (req, res) => {
    const account = accounts.find((r) => r.accountNumber === parseInt(req.params.accountNumber));
    if (!account) {
        return res.status(404).
        send('The request with the given ID was not found.');
    }

    const index = accounts.indexOf(account);
    accounts.splice(account, 1);

    res.status(201);
    res.send(account);
};

export const getAllAccounts = (req, res) => {
    res.send(accounts);
    res.status(200);
};


export const getAccountById =(req, res) => {
    const account = accounts.find((r) => r.accountNumber === parseInt(req.params.accountNumber));
    if (!account) {
        return res.status(404).send('The account with the given ID was not found.');
    }
    res.send(account);
};

export const creditDebitAccount =(req, res) => {
    const transaction = {
        id: transactions.length + 1,
        accountNumber : req.body.accountNumber ,
        cashier: req.body.cashier,
        amount : req.body.amount,
        type : req.body.type,
        accountBalance : req.body.accountBalance
    }
    transactions.push(transaction);
    res.status(201);
    res.send(transaction);
};

