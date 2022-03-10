import { MuscleGroup } from "../entities";
import { MuscleName } from "../entities/MuscleGroup";
import {
	Arg,
	Field,
	InputType,
	Mutation,
	Query,
	Resolver,
	ID,
} from "type-graphql";

@InputType()
export class ExerciseMuscleGroupInput {
	@Field(() => ID)
	id: string;
}

@InputType()
export class MuscleGroupInput {
	@Field(() => ID)
	id: string;

	@Field()
	name: MuscleName;
}

@Resolver()
export class MuscleGroupResolver {
	@Query(() => [MuscleGroup])
	async muscleGroups(): Promise<MuscleGroup[]> {
		return MuscleGroup.find();
	}

	@Query(() => MuscleGroup, { nullable: true })
	muscleGroup(@Arg("id") id: number): Promise<MuscleGroup | undefined> {
		return MuscleGroup.findOne(id);
	}

	@Mutation(() => MuscleGroup)
	async createMuscleGroup(
		@Arg("options") options: MuscleGroupInput
	): Promise<MuscleGroup> {
		return MuscleGroup.create({
			name: options.name,
		}).save();
	}
}
