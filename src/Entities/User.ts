import {Entity,PrimaryColumn,Column,OneToMany} from "typeorm"
import { Article } from "./Artice"

@Entity()
export class User{
    @PrimaryColumn()
    email:string

    @Column({unique:true,type:'text'})
    username:string

    @Column({type:'text',nullable:true})
    bio:string

    @Column({nullable:true})
    image?:string

    //one user can have authored many articles

}

  