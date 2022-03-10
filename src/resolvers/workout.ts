// import { Exercise, Workout } from "../entities";
// import {
// 	Arg,
// 	Field,
// 	InputType,
// 	Int,
// 	Mutation,
// 	Query,
// 	Resolver,
// } from "type-graphql";

// @InputType()
// class WorkoutInput {
// 	@Field()
// 	name: string;
// 	@Field(() => [Int])
// 	exercises: Exercise[];
// }

// @Resolver()
// export class WorkoutResolver {
// 	@Query(() => [Workout])
// 	async workouts(): Promise<Workout[]> {
// 		return Workout.find();
// 	}

// 	@Query(() => Workout, { nullable: true })
// 	workout(@Arg("id") id: number): Promise<Workout | undefined> {
// 		return Workout.findOne(id);
// 	}

// 	@Mutation(() => Workout)
// 	async createWorkout(@Arg("options") options: WorkoutInput): Promise<Workout> {
// 		return Workout.create({
// 			name: options.name,
// 			exercises: options.exercises,
// 		}).save();
// 	}
// }
