import { accounts } from '../model/ultilities';

class AccountController{


/**
 *
 *@method createAccount
 * @description creates a new bank account
 * @param {object} req - the request body
 * @param {object} res - the response body
 * @memberof AccountController
 */
static createAccount(req, res) {
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
    res.status(201)
    .json({
status: '201',
data: account,
    });
    
};
}

export default AccountController;