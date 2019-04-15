export const accounts = [{
    id:1,
    accountNumber:1,
    firstName:'Becky',
    lastName:'Uwah',
    email:'adam@gmail.com',
    owner: 1,
    type:'savings',
    status:'active',
    balance:39000.80
},
{
    id:2,
    firstName:'Adams',
    lastName:'Adebayo',
    accountNumber:2,
    email:'adams@gmail.com',
    owner: 2,
    type:'current',
    status:'draft',
    balance:49000.87
},
{
    id:3,
    firstName:'Adams',
    lastName:'Adebayo',
    accountNumber:3,
    email:'adam@gmail.com',
    owner: 4,
    type:'savings',
    status:'dorn',
    balance:39000.09
}
];

export const transactions = [
    {
        id : 1 ,
        createdOn : '20-03-2019' ,
        type : 'credit',
        accountNumber: 1 ,
        cashier: 1 ,
        amount : 34000.00,
        oldBalance : 45000.98,
        newBalance : 79000.78

    },
    {
        id : 2 ,
        createdOn : '20-02-2019' ,
        type : 'credit',
        accountNumber: 2 ,
        cashier: 2 ,
        amount : 34000.00,
        oldBalance : 45000.89,
        newBalance : 79000.00
    },
    {
        id : 3 ,
        createdOn : '20-03-2019' ,
        type : 'debit',
        accountNumber: 3 ,
        cashier: 3,
        amount : 34000.90,
        oldBalance : 45000.99,
        newBalance : 79000.98
    }
]

export const users =[
    {
        id: 1,
        email: 'adamsade@gmail.com',
        firstName:'Adams',
        lastName: 'Adebayo',
        type:'client',
        phoneNumber:'09065432123',
        isAdmin:false
    },
    {
        id: 2,
        email: 'beckyuwah@gmail.com',
        firstName:'Becky',
        lastName: 'uwah',
        type:'client',
        phoneNumber:'09065432123',
        isAdmin:'false'
    },
    {
        id: 3,
        email: 'wunibankole@gmail.com',
        firstName:'wumi',
        lastName: 'bankole',
        type:'staff',
        phoneNumber:'09065432123',
        isAdmin:true
    }
]