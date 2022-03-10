import { Field, ObjectType, registerEnumType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	ManyToMany,
} from "typeorm";
import { Exercise } from ".";

export enum MuscleName {
	ABS = "abs",
	QUADRICEPS = "quadriceps",
	CALVES = "calves",
	SHOULDERS = "shoulders",
	CHEST = "chest",
	TRICEPS = "triceps",
	BICEPS = "biceps",
	BACK = "back",
}

registerEnumType(MuscleName, {
	name: "MuscleName",
});

@ObjectType()
@Entity()
export class MuscleGroup extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field(() => MuscleName)
	@Column({
		type: "enum",
		enum: MuscleName,
		default: MuscleName.ABS,
	})
	name: MuscleName;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToMany(() => Exercise, (exercise) => exercise.muscleGroups)
	exercises: Exercise[];
}
