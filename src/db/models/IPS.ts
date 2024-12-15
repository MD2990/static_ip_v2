import mongoose, { Schema, Document } from "mongoose";

interface IPS extends Document {
	ip: string;
	location: string;
	device_type: string;
	added_by: string;
	notes?: string;
	createdAt: Date;
	updatedAt: Date;
}

const MODEL_NAME = "IPS";
const schema = new Schema<IPS>(
	{
		ip: {
			type: String,
			required: [true, "IP is Required"],
			unique: true,
			trim: true,
		},
		location: {
			type: String,
			uppercase: true,
			trim: true,
			required: [true, "location is Required"],
		},
		device_type: {
			type: String,
			trim: true,
			required: [true, "device Type is Required"],
		},
		added_by: {
			uppercase: true,
			type: String,
			trim: true,
			required: [true, "Added By is Required"],
		},
		notes: {
			type: String,
			default: "No Notes",
		},
	},
	{ timestamps: true }
);

export default (mongoose.models[MODEL_NAME] as mongoose.Model<IPS>) ||
	mongoose.model<IPS>(MODEL_NAME, schema, "IPS");
