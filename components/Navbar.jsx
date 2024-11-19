import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex flex-row justify-between items-center bg-white shadow-md px-10">
      <div className="flex flex-row gap-4 items-center justify-start text-md">
        <Image
          className="pt-5 pb-3"
          src="/assets/logo.png"
          alt="logo"
          width={150}
          height={150}
        />
        <Link href="/">
          <p className="mb-2">Home</p>
        </Link>
        <Link href="/upload">
          <p className="mb-2">Upload</p>
        </Link>
      </div>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
