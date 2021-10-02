import { Entity,PrimaryGeneratedColumn,Column,OneToMany } from 'typeorm'
import { Notes } from './Notes';

@Entity()

export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(()=>Notes,notes=>notes.user)
    notes: Notes[]
}