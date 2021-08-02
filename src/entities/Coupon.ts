import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "coupons", schema: "rooftop-backend-challenge"})
export class Coupon{
    @PrimaryGeneratedColumn()
    id!: Number;

    @Column({name: "code"})
    code!: String;
    
    @Column({name: "customer_email"})
    customerEmail!: String;

    @Column({name: "assigned_at"})
    assignedAt!: Date;

    @Column({name: "expires_at"})
    expiresAt!: Date;
}