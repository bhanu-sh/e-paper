//get all papers
import { NextResponse } from "next/server";
import Paper from "@/models/paperModel";
import { connect } from "@/dbConfig/dbConfig";
import mongoose from "mongoose";

connect();

export async function GET() {
  try {
    const papers = await Paper.find();
    return NextResponse.json(papers);
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
