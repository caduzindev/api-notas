import { createConnection } from 'typeorm'

export const setupConnection = async()=>{
    await createConnection().catch(err=>console.log(err))
}