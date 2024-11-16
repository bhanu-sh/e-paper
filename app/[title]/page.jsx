"use client"

import { useParams } from "next/navigation";
import React from "react";

const PDFViewer = () => {
  const title = useParams().title;
  const fileUrl = `/uploads/${title}`;

  return (
    <div>
      <h1>View PDF</h1>
      <iframe
      className=" h-screen w-full"
        src={`${fileUrl}`}
      ></iframe>
    </div>
  );
};

export default PDFViewer;
