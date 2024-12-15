import { dbConnect } from "@app/dbConnect";
import EMP from "@models/ips/EMP";
import { NextResponse } from "next/server";
var mongoose = require("mongoose");

// DELETE /api/emp/edit_emp
export async function DELETE(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "id is required", status: 404 });
    }

    await EMP.findByIdAndDelete(id).catch((err) =>
      NextResponse.json({ error: err.message, status: 500 })
    );
    return NextResponse.json({ done: true, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

// PUT /api/emp/edit_emp
export async function PUT(request) {
  try {
    await dbConnect();

    // Extract data from the JSON request
    const { _id, employee_name } = await request.json();
    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      return NextResponse.json({ message: "id is required" }, { status: 404 });
    }

    // check if ip is already exist

    // Attempt to save the data
    return await EMP.findByIdAndUpdate(_id, {
      employee_name,
    }).then(() =>
      NextResponse.json(
        {
          message: "Added Successfully",
        },
        {
          status: 200,
        }
      )
    );

    // Data was saved successfully
  } catch (error) {
    // check if the error is duplicate key
    if (error.code === 11000) {
      return NextResponse.json(
        {
          message: "Employee Already Exists",
        },
        {
          status: 409,
        }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
