import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10;

export function hashPassword(password:string):Promise<string>{
    return new Promise<string>((resolve,reject)=>{
        bcrypt.hash(password,SALT_ROUNDS,(err:any,encrypted:string|undefined)=>{
            if(err)return reject(err)
            resolve(encrypted as string);
        })
    })
} 

export function matchPassword(hash:string,password:string):Promise<Boolean>{
    return new Promise<Boolean>((resolve,reject)=>{
        bcrypt.compare(password,hash,(err,flag)   =>{
            if(err)return reject(err);
            resolve(flag); 
        })
    })
}

async function check(){
    const pass = "abcdef";
    const hashPass = await hashPassword(pass);
    const checker = "abcdef";
    const check = await matchPassword(hashPass,checker);
    console.log(checker + ":" +check);
}

check();