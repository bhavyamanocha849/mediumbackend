import express from 'express';
import bodyParser from 'body-parser'//use deprecated
import { createConnection } from "typeorm";
import { Article } from './Entities/Artice';
import { User } from './Entities/User';
import { usersRoute } from './routes/Users';
import { userRoute } from './routes/User';
import { articleRouter } from './routes/Article';
const app = express();

//body parser
app.use(express.json());

//app.use(urlencoded()) but we are not taking the data from an html form so it could be avoided

app.get('/',(req,res)=>{
    res.send("hello World");
})

app.use('/api/user',userRoute);
app.use('/api/users',usersRoute);
app.use('/api/article',articleRouter);

async function start(){
    await createConnection({
        //will be added to  a config so that it should not be added to git  
        type:'postgres',
        username:'conduit',
        password:'conduit',
        database:'conduit',
        entities:[Article,User],
        synchronize:true,
        logging:true,
        // dropSchema:true,
        logger:'advanced-console'
    })
    app.listen(3232,()=>{
        console.log("server started at : 3232")
    });
}

start();

