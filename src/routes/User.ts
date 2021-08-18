import {Router} from 'express'
import { getUserFromEmail, updateUser } from '../controller/Users';
import { authByToken } from '../middlewares/auth';

const route = Router()


//GET /user get the details of the user
route.get('/',authByToken,async(req,res)=>{
  //if the middle ware ran correctly then req.user already exists
  
    try{
        const user = await getUserFromEmail((req as any).user.email);
        if(!user)throw new Error('No such data found');

        return res.status(201).json({
            user:user
        })
    }catch(err){
        return res.status(404).json({
            error:{body:[err.message]}
        })
    }
})

//patch /user update user details

route.patch('/',authByToken,async(req,res)=>{
    try{
        const user = await updateUser((req as any).user.body,(req as any).user.email);
        if(user){
            return res.status(201).json({
                user:user                
            })
        }
    }catch(err){
        return res.status(422).json({
            error:{body:['unable to update user',err.message]}
        })
    }
})

export const userRoute = route;

