import { User } from "../Entities/User";

export function sanitizeFields(user:User){
    if(!user.password)delete user.password;
    // user.password= undefined;
    return user;
}