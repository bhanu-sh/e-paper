"use client";

import React, { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error(await res.text());

      console.log("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Upload PDF</h1>
        <input
          type="file"
          name="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
