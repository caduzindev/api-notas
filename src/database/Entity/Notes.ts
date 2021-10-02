import { Entity,PrimaryGeneratedColumn,Column, ManyToOne } from 'typeorm'
import { User } from './User'

@Entity()

export class Notes{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    body: string

    @ManyToOne(()=>User,user=>user.notes,{
        cascade:true
    })
    user: User;
}