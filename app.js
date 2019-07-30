const express= require('express');
const bp = require('body-parser');
const app =express();
const graphQLHTTP = require('express-graphql');
const mongoose= require('mongoose');
const schema = require('./schema/index');
const resolvers = require('./resolvers/index');
const  isAuth = require('./middleware/auth');
const cors = require('cors');
app.use(bp.json());

app.use(cors());

app.use(isAuth);

app.use('/graphql',graphQLHTTP({
    schema:schema,
    rootValue:resolvers,
    graphiql:true
}));

mongoose.connect('mongodb://mongo:27017/app')
    .then(()=>{
        console.log('connection established');
        app.listen(8000);
    })
    .catch((e)=>console.log(e));

