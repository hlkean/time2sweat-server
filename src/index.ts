import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { ExerciseResolver } from "./resolvers/exercise";
// import { WorkoutResolver } from "./resolvers/workout";
import { MuscleGroupResolver } from "./resolvers/muscleGroup";
import {
	Exercise,
	User,
	MuscleGroup,
	// Workout
} from "./entities";
console.log("hey there");

const main = async () => {
	const conn = await createConnection({
		type: "postgres",
		database: "time2sweat",
		username: "postgres",
		password: "postgres",
		logging: true,
		synchronize: true,
		entities: [
			Exercise,
			User,
			MuscleGroup,
			// Workout
		],
	});
	const app = express();
	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [
				HelloResolver,
				ExerciseResolver,
				// WorkoutResolver,
				MuscleGroupResolver,
			],
			validate: false,
		}),
	});
	await apolloServer.start();
	apolloServer.applyMiddleware({ app });
	app.listen(4000, () => {
		console.log("server started on port 4000");
	});
};

main().catch((err) => {
	console.log("Got an error: ", err);
});
