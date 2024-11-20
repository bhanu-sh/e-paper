"use client";

import React, { useState } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

export default function UploadPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async () => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append(
        "file",
        document.querySelector("input[type=file]").files[0]
      );
      formData.append("date", document.querySelector("input[type=date]").value);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      setData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-96">
      <SignedIn>
        <Card className="flex flex-col justify-center items-center">
          <CardHeader>
            <CardTitle>Upload Paper</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input type="file" name="file" required />
            <Input type="date" name="date" required />
            <Button type="submit" onClick={handleUpload} disabled={loading}>
              Upload
            </Button>
            {error && <p className="text-red-500">{error}</p>}
            {data && (
              <p className="text-green-500">File uploaded successfully.</p>
            )}
          </CardContent>
        </Card>
      </SignedIn>
      <SignedOut>
        <Card className="flex flex-col justify-center items-center">
          <CardHeader>
            <CardTitle>Upload Paper</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Please sign in to upload a paper.</p>
          </CardContent>
        </Card>
      </SignedOut>
    </div>
  );
}
