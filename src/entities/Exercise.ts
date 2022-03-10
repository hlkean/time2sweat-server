import { Field, Int, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	ManyToMany,
	JoinTable,
} from "typeorm";
import { MuscleGroup } from ".";

@ObjectType()
@Entity()
export class Exercise extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	name: string;

	@Field(() => Int)
	@Column()
	difficulty: number;

	@Field(() => [MuscleGroup], { nullable: true })
	@ManyToMany(() => MuscleGroup, (muscleGroup) => muscleGroup.exercises)
	@JoinTable({
		name: "exercise_muscle_groups_muscle_group", // table name for the junction table of this relation
		joinColumn: {
			name: "exerciseId",
			referencedColumnName: "id",
		},
		inverseJoinColumn: {
			name: "muscleGroupId",
			referencedColumnName: "id",
		},
	})
	muscleGroups: Promise<MuscleGroup[]>;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;

	// @Field(() => [Int])
	// @ManyToMany(() => Workout, (workout) => workout.exercises)
	// @JoinTable()
	// workouts: Workout[];
}
