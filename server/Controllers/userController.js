const users =[
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

export const signUp = (req,res) => {
    const user = {
        token:req.body.token,
        id: users.length + 1,
        firstName : req.body.firstName ,
        lastName: req.body.lastName,
        email : req.body.email,
        phoneNumber : req.body.phoneNumber,
        type : req.body.type
    }
    users.push(user);
    res.status(201);
    res.send(user);
};