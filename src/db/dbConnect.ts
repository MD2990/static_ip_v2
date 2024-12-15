import mongoose from "mongoose";

const DB = process.env.MONGODB_URI;

export async function dbConnect() {
	mongoose.set("strictQuery", true);
	if (!DB) {
		throw new Error(
			"Please define the MONGODB_URI environment variable inside .env.local"
		);
	}

	/**
	 * Global is used here to maintain a cached connection across hot reloads
	 * in development. This prevents connections growing exponentially
	 * during API Route usage.
	 */
	interface MongooseCache {
		conn: typeof mongoose | null;
		promise: Promise<typeof mongoose> | null;
	}

	let cached: MongooseCache = (
		global as typeof globalThis & { mongoose: MongooseCache }
	).mongoose || { conn: null, promise: null };

	if (!cached) {
		cached = (
			global as typeof globalThis & { mongoose: MongooseCache }
		).mongoose = { conn: null, promise: null };
	}

	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			family: 4,
		};

		cached.promise = mongoose
			.connect(DB, opts)
			.then((mongoose: typeof import("mongoose")) => {
				return mongoose;
			});
	}
	cached.conn = await cached.promise;
	return cached.conn;
}

interface Jsonifiable {
	[key: string]: unknown | object;
}

export function jsonify(obj: Jsonifiable): Jsonifiable {
	return JSON.parse(JSON.stringify(obj));
}
