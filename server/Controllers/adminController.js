export const accounts = [{
    id:1,
    accountNumber: '6543267634',
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
    accountNumber: '6543267684',
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
    accountNumber: '6583267634',
    email:'adam@gmail.com',
    owner: '4',
    type:'savings',
    status:'dorn',
    balance:'#39,000'
}
];

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