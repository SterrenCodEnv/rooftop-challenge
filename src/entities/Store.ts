import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'stores', schema: 'rooftop-backend-challenge', synchronize: false})
export class Store{
    @PrimaryGeneratedColumn({type: 'bigint', name: 'id'})
    id!: Number;

    @Column('character varying', {name: 'name', nullable: true})
    name!: String;
    
    @Column('character varying',{name: 'address', nullable: true})
    address!: String;
}