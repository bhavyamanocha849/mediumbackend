import express from 'express';
import { createConnection } from "typeorm";
import { Article } from './Entities/Artice';
import { User } from './Entities/User';
const app = express();

app.get('/',(req,res)=>{
    res.send("hello World");
})



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
        dropSchema:true,
        logger:'advanced-console'
    })
    app.listen(3232,()=>{
        console.log("server started at : 3232")
    });
}

start();

