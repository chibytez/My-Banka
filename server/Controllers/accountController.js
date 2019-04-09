import { accounts } from '../helper/utilities';


export const createAccount =(req, res) => {
    const account = {
        id: accounts.length + 1,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        accountNumber: req.body.accountNumber,
        email: req.body.email,
        type:req.body.type,
        openingBalance:req.body.openingBalance
    }
    accounts.push(account);
    res.status(201);
    res.send(account);
};
