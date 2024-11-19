"use client";

import React, { useState } from "react";

export default function UploadPage() {

  return (
    <div>
      <form method="POST" action="/api/upload" encType="multipart/form-data">
        <input type="file" name="file" required />
        <input type="date" name="date" required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
