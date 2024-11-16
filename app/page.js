"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [papers, setPapers] = useState([]);
  useEffect(() => {
    fetch("/api/getall")
      .then((res) => res.json())
      .then((data) => setPapers(data));
  }, []);
  return <div className="">
    <h1 className="text-3xl font-bold text-center">Papers</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {papers.map((paper) => (
        <div key={paper._id} className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-xl font-bold">{paper.title}</h2>
          <p className="text-gray-500">{paper.description}</p>
          <div className="mt-4">
            <Image
              src={`/uploads/${paper.title}`}
              alt={paper.title}
              width={500}
              height={500}
            />
          </div>
        </div>
      ))}
    </div>
  </div>;
}
