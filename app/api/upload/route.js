import { writeFile, mkdir } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";
import Paper from "@/models/paperModel";
import { connect } from "@/dbConfig/dbConfig";
import mongoose from "mongoose";

connect();

export async function POST(request) {
  const data = await request.formData();
  const file = data.get("file");
  const newsDate = data.get("date"); // Get the date from the form

  if (!file) {
    return NextResponse.json({ success: false, message: "No file provided" });
  }

  if (!newsDate) {
    return NextResponse.json({ success: false, message: "No date provided" });
  }

  try {
    // Validate and format the date
    const dateObj = new Date(newsDate);
    if (isNaN(dateObj)) {
      return NextResponse.json({
        success: false,
        message: "Invalid date format",
      });
    }
    const formattedDate = dateObj.toISOString().split("T")[0].replace(/-/g, ""); // Format: YYYYMMDD

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create the file name as YYYYMMDD
    const fileName = `${formattedDate}${file.name.slice(file.name.lastIndexOf("."))}`; // Append original extension
    const directory = join(process.cwd(), "public", "uploads");
    const path = join(directory, fileName);

    await mkdir(directory, { recursive: true }); // Ensure the directory exists
    await writeFile(path, buffer); // Write the file
    console.log("File uploaded to", path);

    // Save the file and date to the database
    const paper = new Paper({
      title: fileName,
      url: `/uploads/${fileName}`,
      newsDate: dateObj, // Save the date in the database
    });
    await paper.save();

    return NextResponse.json({ success: true, message: "File uploaded" });
  } catch (error) {
    console.error("File upload failed:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
