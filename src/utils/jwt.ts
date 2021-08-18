import jwt from 'jsonwebtoken';
import { User } from '../Entities/User';
const SECRET_KEY= "just_a_very_secure_secret_key";

export function sign(user:User):Promise<string>{
    return new Promise((resolve,reject)=>{
        jwt.sign(JSON.stringify({username:user.username,email:user.email}),SECRET_KEY,(err:any,encoded:string|undefined)=>{
            if(err)return reject(err);
            else resolve(encoded as string);
        })

    })
}

export function decode(token:string):Promise<User>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token,SECRET_KEY,(err,decoded)=>{
            if(err){
                console.log(err.message);
                return reject(err);
            }
            else return resolve(decoded as User);
        }); 
    })
}
