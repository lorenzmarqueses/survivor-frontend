"use client";
import AddSurvivor from "@/components/add-survivor";
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
import useFetchSurvivorsQuery from "@/hooks/useFetchSurvivorsQuery";
import { convertToDateString } from "@/lib/utils";
import React, { useState } from "react";
import { FaArrowDown, FaArrowUp, FaInfoCircle, FaPlusCircle } from "react-icons/fa";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

const SurvivorsPage: React.FC = () => {
  const [page, setPage] = useState(1); // Start on page 1
  const [limit, setLimit] = useState(10); // Show 10 items per page

  const { data: survivorsData, error, isLoading } = useFetchSurvivorsQuery(page, limit);

  const survivors = survivorsData?.data.survivors || [];
  const total = survivorsData?.total || 0;

  const healthySurvivorsCount = survivorsData?.data.nonInfectedCount;

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<string>("name");

  const handleSort = (field: string) => {
    const newSortOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  const sortedSurvivors = survivors
    ? [...survivors].sort((a, b) => {
        if (sortField === "name") {
          return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortField === "status") {
          return sortOrder === "asc"
            ? Number(a.infected) - Number(b.infected)
            : Number(b.infected) - Number(a.infected);
        } else if (sortField === "dateAdded") {
          return sortOrder === "asc"
            ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return 0;
      })
    : [];

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(total / limit)) {
      setPage(newPage);
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center mt-6">
        <div>
          <h1 className="text-2xl font-semibold">List of Survivors</h1>
          <div className="inline-flex items-center gap-2">
            <p>You have {healthySurvivorsCount} healthy survivors</p>
            <FaInfoCircle color="#5F5F61" />
          </div>
        </div>
        <AddSurvivor refetch={() => {}} />
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
              <TableRow className="m-4" key={survivor.id}>
                <TableCell className="inline-flex items-center gap-2 py-4 font-medium">
                  <Avatar className="border-2 border-white cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  {survivor.name}
                </TableCell>
                <TableCell className="py-4">
                  {survivor.infected ? (
                    <span className="bg-red-100 text-red-500 px-2 py-1 rounded-lg">• Infected</span>
                  ) : (
                    <span className="bg-green-100 text-green-500 px-2 py-1 rounded-lg">• Healthy</span>
                  )}
                </TableCell>
                <TableCell className="py-4">{convertToDateString(survivor.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex flex-row">
          <div className="w-[50%] py-4">
            Showing <span className="font-semibold">{(page - 1) * limit + 1}</span> to{" "}
            <span className="font-semibold">{Math.min(page * limit, total)}</span> of{" "}
            <span className="font-semibold">{total}</span> Results
          </div>
          <Pagination className="justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={`border ${page === 1 ? "opacity-50 cursor-none" : "cursor-pointer"}`}
                  onClick={() => handlePageChange(page - 1)}
                  aria-disabled={page === 1}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className={`border ${page * limit >= total ? "opacity-50 cursor-none" : "cursor-pointer"}`}
                  onClick={() => handlePageChange(page + 1)}
                  aria-disabled={page * limit >= total}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default SurvivorsPage;
