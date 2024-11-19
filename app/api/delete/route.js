import { unlink } from "fs/promises"; // To delete files
import { join } from "path";
import { NextResponse } from "next/server";
import Paper from "@/models/paperModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

// DELETE handler for deleting a file
export async function DELETE(request) {
  const { id } = await request.json(); // Expect the request body to contain the ID of the file record to delete

  if (!id) {
    return NextResponse.json({
      success: false,
      message: "File ID is required",
    });
  }

  try {
    // Find the paper in the database
    const paper = await Paper.findById(id);

    if (!paper) {
      return NextResponse.json({ success: false, message: "File not found" });
    }

    const filePath = join(process.cwd(), "public", paper.url); // Construct the full file path

    // Delete the file from the folder
    try {
      await unlink(filePath);
      console.log("File deleted from", filePath);
    } catch (error) {
      console.error("File deletion failed:", error);
      return NextResponse.json({
        success: false,
        message: "Failed to delete file from folder",
        error: error.message,
      });
    }

    // Delete the record from the database
    await Paper.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "File deleted" });
  } catch (error) {
    console.error("Failed to delete file record:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to delete file record",
      error: error.message,
    });
  }
}
