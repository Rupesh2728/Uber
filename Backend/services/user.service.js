const userModal = require('../models/user.modal');

module.exports.createUser = async({
    firstname,lastname,email,password
})=>{
    if(!firstname || !email || !password)
    {
        throw new Error('All fields are required');
    }

    const user = await userModal.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
    });

    return user;
}