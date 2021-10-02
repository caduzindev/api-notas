import { getRepository } from "typeorm";
import { Resolvers, User } from "../../generated/graphql";
import {User as UserEntity} from '../../database/Entity/User'
import {Notes as NoteEntity} from '../../database/Entity/Notes'

interface ContextApollo{
    user:User
}

const resolvers:Resolvers<ContextApollo> = {
    Query:{
        note:async (_,args,context)=>{
            if(context.user != null){
                const { noteId } = args
                const noteRepository = getRepository(NoteEntity)
    
                const note = await noteRepository.findOne(noteId)
    
                return note
            }else{
                throw new Error("user not logged in");
            }
        }
    },
    Mutation:{ 
        addNote:async(_,args,context)=>{
            if(context.user != null){
                const { note:{title,body} } = args

                const userRepository = getRepository(UserEntity)
                const noteRepository = getRepository(NoteEntity)
                
                const user = await userRepository.findOne(context.user.id)

                const note = new NoteEntity()
                note.title = title
                note.body = body
                note.user = user
                
                return await noteRepository.save(note)
            }else{
                throw new Error("user not logged in");
            }
        },
        updateNote:async(_,args,context)=>{
            if(context.user != null){
                const { note:{title,body},noteId } = args
                const noteRepository = getRepository(NoteEntity)

                const note = await noteRepository.findOne({
                    relations:["user"],
                    where:{
                        id:noteId
                    }
                })

                if(note.user.id != context.user.id){
                    throw new Error("You cannot update this note.");
                }

                note.title = title
                note.body = body
                
                return await noteRepository.save(note)
            }else{
                throw new Error("user not logged in");
            }
        },
        deleteNote:async(_,args,context)=>{
            if(context.user != null){
                const { noteId } = args
                const noteRepository = getRepository(NoteEntity)

                const note = await noteRepository.findOne({
                    relations:["user"],
                    where:{
                        id:noteId
                    }
                })

                if(note.user.id != context.user.id ){
                    throw new Error("You cannot delete this note.");
                }

                return await noteRepository.remove(note)
            }else{ 
                throw new Error("user not logged in");
            }
        }
    }
}

export default resolvers