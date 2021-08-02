import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "stores", schema: "rooftop-backend-challenge"})
export class Store{
    @PrimaryGeneratedColumn()
    id!: Number;

    @Column({name: "name"})
    name!: String;
    
    @Column({name: "address"})
    address!: String;
}