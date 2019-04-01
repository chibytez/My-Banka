export const accounts = [{
    id:1,
    accountNumber: 6543267634,
    firstName:'Becky',
    lastName:'Uwah',
    email:'adam@gmail.com',
    owner: '1',
    type:'savings',
    status:'active',
    balance:'#39,000'
},
{
    id:2,
    firstName:'Adams',
    lastName:'Adebayo',
    accountNumber: 6543267684,
    email:'adams@gmail.com',
    owner: '2',
    type:'current',
    status:'draft',
    balance:'#49,000'
},
{
    id:3,
    firstName:'Adams',
    lastName:'Adebayo',
    accountNumber: 6583267634,
    email:'adam@gmail.com',
    owner: '4',
    type:'savings',
    status:'dorn',
    balance:'#39,000'
}
];

const transactions = [
    {
        id : 1 ,
        createdOn : '20/03/2019' ,
        type : 'credit',
        accountNumber: 5676943478 ,
        cashier: 1 ,
        amount : '#34000',
        oldBalance : '#45,000',
        newBalance : '#79,000'

    },
    {
        id : 2 ,
        createdOn : '20/02/2019' ,
        type : 'credit',
        accountNumber: 5676943478 ,
        cashier: 2 ,
        amount : '#34000',
        oldBalance : '#45,000',
        newBalance : '#79,000'
    },
    {
        id : 3 ,
        createdOn : '20/03/2019' ,
        type : 'debit',
        accountNumber: 5676943478 ,
        cashier: 3,
        amount : '#34000',
        oldBalance : '#45,000',
        newBalance : '#79,000'
    }
]

export const activateDeactivateAccount = (req, res) => {
    const account = accounts.find((r) => r.id === parseInt(req.params.id));
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
    const account = accounts.find((r) => r.id === parseInt(req.params.id));
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
    const account = accounts.find((r) => r.id === parseInt(req.params.id));
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

