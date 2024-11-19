"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const [papers, setPapers] = useState([]);

  const getPapers = async () => {
    fetch("/api/getall")
      .then((res) => res.json())
      .then((data) => setPapers(data));
  };

  const deletePaper = async (id) => {
    try {
      const res = await fetch("/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error(await res.text());

      console.log("File deleted successfully");
      getPapers();
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
      <div className="flex flex-wrap px-10">
        {papers.map((paper) => (
          <Card key={paper._id}>
            <CardHeader>
              <CardTitle>
                {
                  //change date format to format like date Month year
                  new Date(paper.newsDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                }
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={`/assets/thumbnail.png`}
                alt={paper.title}
                width={300}
                height={300}
              />
            </CardContent>
            <CardFooter>
              <Link
                href={`/${paper.title}`}
                className="text-blue-600 underline"
              >
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
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
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
