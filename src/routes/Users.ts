import {Router} from 'express';
import { createUser, loginUser } from '../controller/Users';

const route = Router()

route.get('/',(req,res)=>{
    res.send("hit  users endpoint")
})

//POST   Login
route.post('/login',async (req,res)=>{
    try{
        const checker = await loginUser({
            email : req.body.user.email,
            password: req.body.user.password
        })

        res.status(200).json(checker);
    }catch(err){
        res.status(420).json({
            error:{body:['Could not create user',err.message]}
        })
    }
})


//POST: register a new user
route.post('/',async(req,res)=>{
    try{
        const user= await createUser({
            username:req.body.user.username,
            email:req.body.user.email,
            password:req.body.user.password,
            bio:req.body.user.bio
        })
        
        res.send(user);
    }
    catch(err){
        console.log(err.message);
        res.status(422).json({
            error:{body:['Could not create user',err.message]}
        });
    }
})

export const usersRoute = route;