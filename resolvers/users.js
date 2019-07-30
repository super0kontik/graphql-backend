const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');

module.exports ={

    createUser:async args=>{
        try {
            const inp = args.userInput;
            const dbUser = await User.findOne({email: inp.email});
            //console.log(user);
            if (dbUser) {
                throw new Error('User already exists')
            }
            const hashedPw = await bcrypt.hash(inp.password, 12);
            const user = new User({
                email: inp.email,
                password: hashedPw
            });
            return await user.save();
        }catch(e){throw e}
    },


    login:async ({email,password})=>{
        try {
            const user = await User.findOne({email: email});
            if (!user) {
                throw new Error('User does not exist');
            }
            const equal = await bcrypt.compare(password, user.password);
            if (!equal) {
                throw new Error('Wrong auth data')
            }
            const token = jwt.sign({userId: user.id, email: user.email}, 'hello', {expiresIn: '1h'})
            return ({userId: user.id, token: token})
        }catch(e){
            throw e;
        }
    }
};