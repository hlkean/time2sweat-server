import { Exercise, MuscleGroup } from "../entities";
import { MuscleGroupInput } from "./muscleGroup";
import { Arg, Mutation, Query, Resolver, Field, InputType } from "type-graphql";
import { Length, Max, Min } from "class-validator";

@InputType()
class ExerciseInput {
	@Field()
	@Length(3, 255)
	name: string;
	@Field()
	@Min(0)
	@Max(10)
	difficulty: number;
}

@Resolver(() => Exercise)
export class ExerciseResolver {
	@Query(() => [Exercise])
	async exercises(): Promise<Exercise[]> {
		return Exercise.find({ relations: ["muscleGroups"] });
	}

	@Query(() => Exercise, { nullable: true })
	exercise(@Arg("id") id: number): Promise<Exercise | undefined> {
		return Exercise.findOne(id);
	}

	@Mutation(() => Exercise)
	async createExercise(
		@Arg("data") { name, difficulty }: ExerciseInput,
		@Arg("muscleGroups", () => [MuscleGroupInput], { nullable: true })
		muscleGroups: MuscleGroup[]
	): Promise<Exercise> {
		const exercise = new Exercise();
		exercise.name = name;
		exercise.difficulty = difficulty;
		exercise.muscleGroups = Promise.resolve(muscleGroups);
		await exercise.save();
		return exercise;
	}

	// @FieldResolver(() => MuscleGroup)
	// muscleGroups(@Root() exercise: Exercise) {
	// 	const groups: MuscleGroup[] = [];
	// 	exercise.muscleGroups.forEach(async (muscle) => {
	// 		console.log("muscle::", muscle);
	// 		const muscleGroup = (await this.muscleGroupRepository.findOne({
	// 			where: {
	// 				name: muscle,
	// 			},
	// 		})) as MuscleGroup;
	// 		groups.push(muscleGroup);
	// 	});
	// 	return groups;
	// }
}
