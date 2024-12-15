import mongoose, { Schema, Document } from "mongoose";

interface EMPLOYEES extends Document {
	employee_name: string;
	createdAt: Date;
	updatedAt: Date;
}

const MODEL_NAME = "EMPLOYEES";
const schema = new Schema<EMPLOYEES>(
	{
		employee_name: {
			type: String,
			unique: true,
			uppercase: true,
			trim: true,
			required: [true, "Employee Name is Required"],
			minlength: [3, "Employee Name must be at least 3 characters."],
			maxlength: [20, "Employee Name must not exceed 20 characters."],
		},
	},
	{ timestamps: true }
);

export default (mongoose.models[MODEL_NAME] as mongoose.Model<EMPLOYEES>) ||
	mongoose.model<EMPLOYEES>(MODEL_NAME, schema, "EMPLOYEES");
