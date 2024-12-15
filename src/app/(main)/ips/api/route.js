import { dbConnect } from "@app/dbConnect";
import { convertDate } from "@lib/helpers";
import DEVICES from "@models/ips/DEVICES";
import EMP from "@models/ips/EMP";
import IPS from "@models/ips/IPS";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    // add Next headers
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "id is required", status: 404 });
    }

    await IPS.findByIdAndDelete(id).catch((err) => {
      return NextResponse.json({ error: err.message, status: 500 });
    });
    return NextResponse.json({ done: true, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();

    let ip = await IPS.find({}).sort({ updatedAt: -1 });

    // get devices number from Devices collection
    const devicesTotal = await DEVICES.find({}).countDocuments();
    const empTotal = await EMP.find({}).countDocuments();

    // convert createdAt to a normal date format (not a timestamp)
    ip = convertDate(ip);

    // get unique device types from the database using aggregation and count the number of each device type

    const devices = await IPS.aggregate([
      {
        $group: {
          _id: "$device_type",
          count: { $sum: 1 },
        },
      },
    ]);

    return NextResponse.json({ ip, devices, empTotal, devicesTotal });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
