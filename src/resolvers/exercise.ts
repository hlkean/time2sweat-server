import { Exercise, MuscleGroup } from "../entities";
import { ExerciseMuscleGroupInput } from "./muscleGroup";
import { Arg, Mutation, Query, Resolver, Field, InputType } from "type-graphql";

@InputType()
class ExerciseInput {
	@Field()
	name: string;
	@Field()
	difficulty: number;
}

@Resolver(() => Exercise)
export class ExerciseResolver {
	// constructor(private muscleGroupRepository: Repository<MuscleGroup>) {}
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
		@Arg("fields") fields: ExerciseInput,
		@Arg("muscleGroups", () => [ExerciseMuscleGroupInput])
		muscleGroups: MuscleGroup[]
	): Promise<Exercise> {
		const exercise = new Exercise();
		exercise.name = fields.name;
		exercise.difficulty = fields.difficulty;
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
