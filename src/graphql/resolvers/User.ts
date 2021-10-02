import { Resolvers, User } from "../../generated/graphql";
import { User as UserEntity } from '../../database/Entity/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getRepository } from "typeorm";

interface ContextApollo{
    user:User
}

const resolvers:Resolvers<ContextApollo> =  {
    Query:{
        getUser:async(_,args,context)=>{
            if(context.user != null){
                const userRepository = getRepository(UserEntity)
                const user = userRepository.findOne({
                    relations:["notes"],
                    where:{
                        id:context.user.id
                    }
                })

                return user;
            }else{
                throw new Error("user not logged in");
            }
        }
    },
    Mutation:{
        login:async(_,args,context)=>{
            if(context.user === null){
                const { user } = args
                const userRepository = getRepository(UserEntity)

                const userExists = await userRepository.findOne({email:user.email})
    
                if(!userExists){
                    throw new Error("User not found");
                }
                if(!await bcrypt.compare(user.password,userExists.password)){
                    throw new Error("Password invalid");
                }

                const token = jwt.sign({id:userExists.id},'coelho',{expiresIn:"1h"})

                return {
                    token
                }
            }
        },
        signup:async(_,args,context)=>{
            if(context.user === null){
                const { user } = args
                const userRepository = getRepository(UserEntity)

                const userExists = await userRepository.findOne({email:user.email})

                if(!!userExists){
                    throw new Error("User already exists");
                }

                const hashPassoword = await bcrypt.hash(user.password,10)

                const newUser = await userRepository.save({
                    name:user.name,
                    email:user.email,
                    password:hashPassoword
                })

                const token = jwt.sign({id:newUser.id},'coelho')

                return {
                    token
                }
            }
        }
    }
}

export default resolvers