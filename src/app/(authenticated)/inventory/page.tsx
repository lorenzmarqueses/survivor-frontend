"use client";
import RequestItem from "@/components/request-item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

const InventoryPage: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<string>("name");

  // Updated data for survivors
  const survivors = [
    {
      name: "John Doe",
      inventories: [
        { name: "Axe", quantity: 1 },
        { name: "Rope", quantity: 5 },
        { name: "Water", quantity: 10 },
      ],
    },
    {
      name: "Jane Smith",
      inventories: [
        { name: "Medicine", quantity: 2 },
        { name: "Bandage", quantity: 3 },
        { name: "Water", quantity: 5 },
      ],
    },
    {
      name: "Bob Johnson",
      inventories: [
        { name: "Food", quantity: 10 },
        { name: "Water", quantity: 5 },
        { name: "Rope", quantity: 2 },
      ],
    },
  ];

  const handleSort = (field: string) => {
    const newSortOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  const sortedSurvivors = [...survivors].sort((a, b) => {
    if (sortField === "name") {
      return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortField === "inventories") {
      return sortOrder === "asc"
        ? a.inventories.length - b.inventories.length
        : b.inventories.length - a.inventories.length;
    }
    return 0;
  });

  return (
    <div>
      <div className="flex flex-row justify-between items-center mt-6">
        <div>
          <h1 className="text-2xl font-semibold">List of Survivors Inventories</h1>
          <div className="inline-flex items-center gap-2">
            <p>You have 10,201 Inventories logged</p>
            <FaInfoCircle color="#5F5F61" />
          </div>
        </div>
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
              <TableHead onClick={() => handleSort("inventories")}>
                <span className="inline-flex items-center gap-2">
                  Inventories
                  {sortField === "inventories" && (sortOrder === "asc" ? <TiArrowSortedUp /> : <TiArrowSortedDown />)}
                </span>
              </TableHead>
              <TableHead>
                <span className="inline-flex items-center gap-2">Action</span>
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
                  {survivor.inventories.map((inventory) => `${inventory.quantity} ${inventory.name}`).join(", ")}
                </TableCell>
                <TableCell className="py-4">
                  <RequestItem />
                </TableCell>
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

export default InventoryPage;
