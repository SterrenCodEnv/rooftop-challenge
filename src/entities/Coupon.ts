import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "coupons", schema: "rooftop-backend-challenge", synchronize: false})
export class Coupon{
    @PrimaryGeneratedColumn({type: "bigint", name: "id"})
    id!: Number;

    @Column( "character", {name: "code", length: 8, nullable: true})
    code!: String;
    
    @Column("character varying", {name: "customer_email", nullable: true})
    customerEmail!: String;

    @Column("timestamp without time zone", {name: "assigned_at", nullable: true})
    assignedAt!: Date;

    @Column("timestamp without time zone", {name: "expires_at", nullable: false})
    expiresAt!: Date;
}