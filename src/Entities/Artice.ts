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

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    upatedAt:Date

    @ManyToOne(()=>User)
    author:User
}

