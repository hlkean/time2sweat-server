import { Field } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	firstName: string;

	@Field()
	@Column()
	lastName: string;

	@Field()
	@Column({ unique: true })
	userName: string;

	@Field()
	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;
}
