"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SignedIn } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

export default function Home() {
  const [papers, setPapers] = useState([]);

  const getPapers = async () => {
    try {
      const response = await fetch("/api/getall");
      if (!response.ok) throw new Error("Failed to fetch papers");
      const data = await response.json();

      // Sort papers by newsDate in descending order
      const sortedData = data.sort((a, b) => new Date(b.newsDate) - new Date(a.newsDate));

      setPapers(sortedData);
    } catch (error) {
      console.error("Error fetching papers:", error);
    }
  };

  const deletePaper = async (id) => {
    try {
      const response = await fetch("/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error(await response.text());

      console.log("File deleted successfully");
      getPapers(); // Refresh papers after deletion
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  useEffect(() => {
    getPapers();
  }, []);

  return (
    <div className="mt-5">
      <h1 className="text-3xl font-bold text-center mb-2">Papers</h1>
      <div className="flex flex-wrap px-10 gap-4">
        {papers.map((paper) => (
          <Card key={paper._id}>
            <CardHeader>
              <CardTitle>
                {new Date(paper.newsDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={paper.thumbnail || `/assets/thumbnail.png`} // Dynamic thumbnail
                alt={paper.title}
                width={300}
                height={300}
              />
            </CardContent>
            <CardFooter>
              <Link href={`/${paper.title}`}>
                <Button variant="blue">View</Button>
              </Link>
              <SignedIn>
                <AlertDialog>
                  <AlertDialogTrigger className="bg-red-500 text-white text-sm ml-5 rounded-md px-4 py-2 hover:bg-red-600">
                    Delete
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this paper?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone and will permanently delete
                        the paper.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deletePaper(paper._id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </SignedIn>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
