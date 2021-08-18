import { Column, Entity,PrimaryColumn,CreateDateColumn,UpdateDateColumn,ManyToOne } from "typeorm";
import { User } from "./User";


@Entity()
export class Article{   

    @PrimaryColumn({length:30})
    slug: string;

    @Column({length:40})
    title: string;

    @Column({length:100,nullable:true})
    description: string

    @Column({type:"text"})
    body:string

    @Column('simple-array', { nullable: true })
    tags: string[];

    @CreateDateColumn()
    createdAt?:Date

    @UpdateDateColumn()
    upatedAt?:Date

    @ManyToOne(()=>User)
    author:User

    constructor(slug:string,title:string,description:string,body:string,author:User,tags:string[]){
        this.slug = slug;
        this.author = author;
        this.title = title,
        this.body =body;
        this.description = description;
        this.tags = tags 
    }
}

