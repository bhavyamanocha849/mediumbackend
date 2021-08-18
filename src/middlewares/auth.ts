import { NextFunction } from "express";
import { readBuilderProgram } from "typescript";
import { decode } from "../utils/jwt";

export async function authByToken(req:any,res:any,next:NextFunction){
    const authHeader = req.header('Authorization')?.split(' ');
    if(!authHeader)return res.status(401).json({
        error:{
            body:['Authorization failure','no Auth header set']
        }
    }) 
    
    if(authHeader[0]!='Token'){
        return res.status(401).json({
            error:{
                body:['Authorization failure','token not set']
            }
        })
    }

    const token = authHeader[1];

    try{
        const user = await decode(token);
        if(!user){
            return res.status(401).json({
                error:{
                    body:['No user found in the token']
                }
            })
        }
        (req as any).user = user;
        return next();
    }
    catch(err){
        console.log(err.message);
        return res.status(401).json({
            error:{
                
                body:['Authorization failed',err.message]
            }
        })
    }
    
}