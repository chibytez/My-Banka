export const accounts = [{
    id:1,
    accountNumber: '6543267634',
    firstName:'Becky',
    lastName:'Uwah',
    email:'adam@gmail.com',
    owner: 1,
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
    owner: 2,
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
    owner: 4,
    type:'savings',
    status:'dorn',
    balance:'#39,000'
}
];

export const transactions = [
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