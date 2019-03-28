
const accounts = [{
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