import { accounts } from '../helper/utilities';


export const createAccount =(req, res) => {
    const account = {
        id: accounts.length + 1,
        firstName:req.body.firstName,
        lpastName:req.body.lastName,
        accountNumber: req.body.accountNumber,
        email: req.body.email,
        type:req.body.type,
        openingBalance:req.body.openingBalance
    }
    accounts.push(account);
    res.status(201);
    res.send(account);
};

export const userGetAccount =(req, res) => {
    const account = accounts.find((r) => r.accountNumber === parseInt(req.params.accountNumber));
    if (!account) {
        return res.status(404).send('The account with the given ID was not found.');
    }
    res.send(account);
};

