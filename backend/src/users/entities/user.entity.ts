// backend/src/users/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    firstName: string;

    @Column({ length: 100 })
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true, select: false })
    password: string;

    @Column({ default: false })
    isVerified: boolean;

    @Column({ default: 'INTERESTED' })
    status: 'INTERESTED' | 'ACTIVE' | 'INACTIVE';

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    postalCode: string;

    @Column({ nullable: true })
    city: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}