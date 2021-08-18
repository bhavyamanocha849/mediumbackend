import { Article } from "../Entities/Artice";
import { User } from "../Entities/User";
import {getRepository} from 'typeorm';
import { slugify } from "../utils/slugify";
import { sanitizeFields } from "../utils/sanitize";


interface articleData{
    slug:string
    title:string
    description:string
    body:string
    tagList:string[]
}


export async function createArticle(data:articleData,email:string):Promise<Article>  {
    if(!data.title)throw new Error('Title Missing');
    if(!data.body)throw new Error('Body Missing');
    if(!data.description)throw new Error('Description Missing')

    const repo = await getRepository(Article);
    const userRepo = await getRepository(User);


    try{
        const user = await userRepo.findOne(email);
        if(!user)throw new Error('User does not exist');

        const newArticle = await repo.save(new Article(
            slugify(data.title),
            data.title,
            data.body,
            data.description,
            sanitizeFields(user),
            data.tagList
            )
        )
        return newArticle;
    }catch(err){
        throw err;
    }
    
}

export async function deleteArticle(slug:string):Promise<boolean>{
    return true;
}

// export async function updateArticle(slug:string,data:Partial<articleData>) : Promise<Article>{
//     return new Article();
// }

// export async function getAllArticles() :Promise<Article[]>{
//     return [new Article()];
// }

// export async function getFeedArticles(user:User):Promise<Article[]>{
//     return [new Article()];
// }

// export async function getArticleBySlug(slug:string):Promise<Article>{
//     return new Article();
// }

