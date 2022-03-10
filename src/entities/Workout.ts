// import { Field, Int, ObjectType } from "type-graphql";
// import {
// 	Entity,
// 	PrimaryGeneratedColumn,
// 	Column,
// 	CreateDateColumn,
// 	UpdateDateColumn,
// 	BaseEntity,
// 	ManyToMany,
// } from "typeorm";
// import { Exercise } from ".";

// @ObjectType()
// @Entity()
// export class Workout extends BaseEntity {
// 	@Field()
// 	@PrimaryGeneratedColumn()
// 	id: number;

// 	@Field()
// 	@Column()
// 	name: string;

// 	@Field(() => [Int])
// 	@ManyToMany(() => Exercise, (exercise) => exercise.workouts)
// 	exercises: Exercise[];

// 	@Field(() => String)
// 	@CreateDateColumn()
// 	createdAt: Date;

// 	@Field(() => String)
// 	@UpdateDateColumn()
// 	updatedAt: Date;
// }
