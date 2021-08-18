
export function slugify(title:string):string{
   
    let slugArr = [];

    for(let i = 0;i<title.length;i++){
        if(i>=30)break;
        let char = title[i].toLowerCase();
        if(char>="a" && char <="z")slugArr.push(char);
        else slugArr.push("-");
    }
    return slugArr.join('');
}

