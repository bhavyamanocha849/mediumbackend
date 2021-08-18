import {Entity,PrimaryColumn,Column,OneToMany} from "typeorm"

@Entity()
export class User{
    @PrimaryColumn()
    email:string

    @Column({unique:true,type:'text'})
    username:string

    @Column({type:'text'})
    password?:string

    @Column({type:'text',nullable:true})
    bio:string

    @Column({nullable:true})
    image?:string

    token?:string


    constructor(username:string,email:string,password:string,bio:string){
        this.username = username
        this.email = email
        this.bio = bio
        this.password = password
    }

}

  