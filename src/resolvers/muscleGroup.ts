import { MuscleGroup } from "../entities";
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
export class MuscleGroupInput {
	@Field(() => ID)
	id: string;
}

@InputType()
export class CreateMuscleGroupInput {
	@Field()
	name: string;
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
		@Arg("options") options: CreateMuscleGroupInput
	): Promise<MuscleGroup> {
		return MuscleGroup.create({
			name: options.name,
		}).save();
	}
}
