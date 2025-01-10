"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from "@/components/ui/table";
import React, { useState } from "react";
import { FaArrowDown, FaArrowUp, FaInfoCircle, FaPlusCircle } from "react-icons/fa";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

const SurvivorsPage: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<string>("name");

  // Updated data for survivors
  const survivors = [
    { name: "John Doe", healthStatus: "Healthy", survivalMethod: "Shooting", dateAdded: "2024-01-01" },
    { name: "Jane Smith", healthStatus: "Injured", survivalMethod: "Medic", dateAdded: "2024-01-02" },
    { name: "Bob Johnson", healthStatus: "Healthy", survivalMethod: "Raft", dateAdded: "2024-01-03" },
  ];

  const handleSort = (field: string) => {
    const newSortOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  const sortedSurvivors = [...survivors].sort((a, b) => {
    if (sortField === "name") {
      return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortField === "status") {
      return sortOrder === "asc"
        ? a.healthStatus.localeCompare(b.healthStatus)
        : b.healthStatus.localeCompare(a.healthStatus);
    } else if (sortField === "dateAdded") {
      return sortOrder === "asc"
        ? new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
        : new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    }
    return 0;
  });

  return (
    <div>
      <div className="flex flex-row justify-between items-center mt-6">
        <div>
          <h1 className="text-2xl font-semibold">List of Survivors</h1>
          <div className="inline-flex items-center gap-2">
            <p>You have 1205 healthy survivors</p>
            <FaInfoCircle color="#5F5F61" />
          </div>
        </div>
        <Button variant="ghost" className="border rounded-lg">
          <FaPlusCircle className="mr-2" />
          Add Survivor
        </Button>
      </div>
      <div className="flex flex-col gap-10 mt-12">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F6F6F6]">
              <TableHead onClick={() => handleSort("name")}>
                <span className="inline-flex items-center gap-2">
                  Name {sortField === "name" && (sortOrder === "asc" ? <TiArrowSortedUp /> : <TiArrowSortedDown />)}
                </span>
              </TableHead>
              <TableHead onClick={() => handleSort("status")}>
                <span className="inline-flex items-center gap-2">
                  Health Status
                  {sortField === "status" && (sortOrder === "asc" ? <TiArrowSortedUp /> : <TiArrowSortedDown />)}
                </span>
              </TableHead>
              <TableHead onClick={() => handleSort("dateAdded")}>
                <span className="inline-flex items-center gap-2">
                  Date Added
                  {sortField === "dateAdded" && (sortOrder === "asc" ? <TiArrowSortedUp /> : <TiArrowSortedDown />)}
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedSurvivors.map((survivor) => (
              <TableRow className="m-4" key={survivor.name}>
                <TableCell className="inline-flex items-center gap-2 py-4 font-medium">
                  <Avatar className="border-2 border-white cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  {survivor.name}
                </TableCell>
                <TableCell className="py-4">
                  <span className="bg-green-100 text-green-500 px-2 py-1 rounded-lg">{survivor.healthStatus}</span>
                </TableCell>
                <TableCell className="py-4">{survivor.dateAdded}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex flex-row">
          <div className="w-[50%] py-4">
            Showing <span className="font-semibold">1</span> to <span className="font-semibold">10</span> of{" "}
            <span className="font-semibold">1205</span> Results
          </div>
          <Pagination className="justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious className="border" href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext className="border" href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default SurvivorsPage;
