import jwt from 'jsonwebtoken'
export const isLogged = ({req}:any)=>{
    const token = req.headers.authorization || '';
    try{
        const user = jwt.verify(token,'coelho')
        return {user}
    }catch(err){
        return {user:null}
    }
}