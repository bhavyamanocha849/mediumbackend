import { Router } from "express";
import { createArticle } from "../controller/Article";
import { authByToken } from "../middlewares/auth";

const route = Router();

//Post Articles  /article
route.post('/',authByToken,async(req,res)=>{
    try{
        const article = await createArticle((req as any).body.article,(req as any).user.email);
        return res.status(201).json({
            article:article
        })
    }catch(err){
        return res.status(442).json({
            error:{body:['article could not be created',err.message]}
        })
    }
})

//Get article /article
route.get('/',async(req,res)=>{

})

//get article for feed  /article/feed
route.get('/feed',authByToken,async(req,res)=>{

})


//get article from slug /article/:slug
route.get('/:slug',async(req,res)=>{

})

//patch article with slug  /article/:slug
route.patch('/:slug',authByToken,async(req,res)=>{

})


//delete article with given slug id /article/:slug
route.delete('/:slug',authByToken,async(req,res)=>{

})

export const articleRouter = route;