import { getRepository } from "typeorm"
import {User} from "../Entities/User"
import { sign } from "../utils/jwt";
import { hashPassword, matchPassword } from "../utils/password"
import { sanitizeFields } from "../utils/sanitize";

interface userSignupData{
    username:string
    email:string
    password:string
    bio:string
}

interface userLoginData{
    email:string
    password:string
}

interface userUpdateData{
    email?:string
    password?:string
    bio?:string
    username?:string
}

export async function createUser(data:userSignupData) :Promise<User>{

    if(!data.password)throw new Error("password cant be empty ");
    if(!data.email)throw new Error("Email cant be blank")
    if(!data.username)throw new Error("Username cant be empty");

    const result = await getRepository(User);

    const user = await result.findOne(data.email);
    if(user)throw new Error ("the user with this email already exists");

    try{
        const user = await  result.save(new User(
            data.username,
            data.email,
            await hashPassword(data.password),
            data.bio
        ));
        
        sanitizeFields(user);
        user.token = await sign(user);
        
        return user;

    }catch(err){
        console.log(err)
        throw err;
    }
}

export async function loginUser(data:userLoginData):Promise<User>{
    if(!data.email)throw new Error("Email not entered");
    if(!data.password)throw new Error("Password not entered");

    const result = await getRepository(User);
    const user =await result.findOne(data.email);
    if(!user) throw new Error("No entry exists with this email!!!")
    try{
        //existing pass is a hash and is not of type string
        const match = await matchPassword(user.password as string,data.password);

        if(match === false)throw new Error("Incorrect Password");
        user.token = await sign(user);
        return sanitizeFields(user);
        
    }catch(err){
        console.log(err.message);   
        throw err;
    }
}

export async function getUserFromEmail(email:string):Promise<User>{
    const result = await getRepository(User);
    const user = await result.findOne(email);

    if(!user) throw new Error("No user with this email ID exists");
    
    return sanitizeFields(user);
}

export async function updateUser(data:userUpdateData,email:string):Promise<User>{
    const repo = await getRepository(User);
    const user = await repo.findOne(email);
    if(!user) throw new Error('User does not exists');

    if(data.username)user.username = data.username;
    if(data.bio)user.bio = data.bio;
    if(data.email)user.email = data.email;
    if(data.password)user.password = await hashPassword(data.password);
    
    const userUpdated = await repo.save(user);
    return sanitizeFields(userUpdated)
}
