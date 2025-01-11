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
import useFetchItemsQuery from "@/hooks/useFetchItemsQuery";
import useFetchSurvivorsInventoryQuery from "@/hooks/useFetchSurvivorsInventoryQuery";
import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

const InventoryPage: React.FC = () => {
  const [page, setPage] = useState(1); // Start on page 1
  const [limit, setLimit] = useState(10); // Show 10 items per page

  const { data: survivorsInventoryData, error, isLoading, refetch } = useFetchSurvivorsInventoryQuery(page, limit);

  const { data: itemsData } = useFetchItemsQuery();

  const survivorsInventory = survivorsInventoryData?.data.survivorsInventory || [];

  const inventoryCount = survivorsInventoryData?.data?.inventoriesCount || 0;

  const total = survivorsInventoryData?.total || 0;

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<string>("name");

  const handleSort = (field: string) => {
    const newSortOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  const sortedSurvivors = survivorsInventory
    ? [...survivorsInventory].sort((a, b) => {
        if (sortField === "name") {
          return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortField === "inventory") {
          return sortOrder === "asc"
            ? a.inventory.length - b.inventory.length
            : b.inventory.length - a.inventory.length;
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
          <h1 className="text-2xl font-semibold">List of Survivors inventory</h1>
          <div className="inline-flex items-center gap-2">
            <p>You have {inventoryCount} inventory logged</p>
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
              <TableHead onClick={() => handleSort("inventory")}>
                <span className="inline-flex items-center gap-2">
                  inventory
                  {sortField === "inventory" && (sortOrder === "asc" ? <TiArrowSortedUp /> : <TiArrowSortedDown />)}
                </span>
              </TableHead>
              <TableHead>
                <span className="inline-flex items-center gap-2">Action</span>
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
                  {survivor.inventory?.length > 0
                    ? survivor.inventory?.map((inventory) => `${inventory.quantity} ${inventory.item.name}`).join(", ")
                    : "No inventory logged"}
                </TableCell>
                <TableCell className="py-4">
                  <RequestItem refetch={refetch} survivor={survivor} items={itemsData ?? []} />
                </TableCell>
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

export default InventoryPage;
