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

  if (!file) {
    return NextResponse.json({ success: false, message: "No file provided" });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Sanitize the file name to remove spaces and special characters
  const sanitizedFileName = file.name.replace(/[^\w.-]/g, "_"); // Replace spaces/special characters with underscores

  const directory = join(process.cwd(), "public", "uploads"); // Path to public/uploads
  const path = join(directory, sanitizedFileName); // Use sanitized file name

  try {
    await mkdir(directory, { recursive: true }); // Ensure the directory exists
    await writeFile(path, buffer); // Write the file
    console.log("File uploaded to", path);

    // Save the file path to the database
    const paper = new Paper({
      title: sanitizedFileName,
      url: `/uploads/${sanitizedFileName}`,
    });
    await paper.save();

    return NextResponse.json({ success: true, message: "File uploaded" });
  } catch (error) {
    console.error("File upload failed:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
