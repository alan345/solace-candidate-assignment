"use client";

import { useEffect, useState } from "react";
import { Advocate } from "./types/advocate.type";
import Image from "next/image";
import Logo from "../../public/logo.svg";
import Specialties from "./components/Specialties";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    fetch(`/api/advocates?searchTerm=${searchTerm}&page=${page}`)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          setError(true);
          setIsLoading(false);
          setAdvocates([]);

          return;
        }
        response.json().then((jsonResponse) => {
          setAdvocates(jsonResponse.data);
          setIsLoading(false);
        });
      })
      .catch((e) => {
        console.error(e);
        setError(true);
        setIsLoading(false);
        setAdvocates([]);
      });
  }, [searchTerm, page]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onClick = () => {
    setSearchTerm("");
  };

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <main className="px-6 py-8 min-h-screen bg-gradient-to-b from-white via-[#f8f8f8] to-[#f0f0f0]">
      <Image src={Logo} width={120} height={120} alt="Solace Advocates Logo" />
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Solace Advocates
      </h1>

      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={onChange}
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
            placeholder="Search advocates..."
          />
          <button
            onClick={onClick}
            className="px-4 py-2 bg-[#347866] text-white rounded-md hover:bg-[#1E4339]"
          >
            Reset Search
          </button>
        </div>
      </div>

      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-[#347866] text-white">
          <tr>
            <th className="px-4 py-2 text-left">First Name</th>
            <th className="px-4 py-2 text-left">Last Name</th>
            <th className="px-4 py-2 text-left">City</th>
            <th className="px-4 py-2 text-left">Degree</th>
            <th className="px-4 py-2 text-left">Specialties</th>
            <th className="px-4 py-2 text-left">Years of Experience</th>
            <th className="px-4 py-2 text-left">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {advocates.map((advocate) => (
            <tr
              key={advocate.id}
              className="border-b last:border-none hover:bg-gray-100"
            >
              <td className="px-4 py-2">{advocate.firstName}</td>
              <td className="px-4 py-2">{advocate.lastName}</td>
              <td className="px-4 py-2">{advocate.city}</td>
              <td className="px-4 py-2">{advocate.degree}</td>
              <td className="px-4 py-2">
                <Specialties specialties={advocate.specialties} />
              </td>
              <td className="px-4 py-2">{advocate.yearsOfExperience}</td>
              <td className="px-4 py-2">{advocate.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center mt-4">
        {isLoading && <div>Loading..</div>}
        {!isLoading && !error && advocates.length === 0 && (
          <div>No Results.</div>
        )}
        {error && (
          <div className="text-red-500">
            Something went wrong. Please try again later.
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md ${
            page === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#347866] text-white hover:bg-[#1E4339]"
          }`}
        >
          Previous
        </button>
        <span className="text-lg font-medium">Page {page}</span>
        <button
          onClick={nextPage}
          className="px-4 py-2 bg-[#347866] text-white rounded-md hover:bg-[#1E4339]"
        >
          Next
        </button>
      </div>
    </main>
  );
}
