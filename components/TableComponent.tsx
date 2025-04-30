import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const columns = [
  { header: "Name", accessor: "name" },
  { header: "Category", accessor: "category" },
  { header: "Amount", accessor: "amount" },
  { header: "Transaction At", accessor: "date" },
];

export default function TableComponent({ data, pageSize = 10 }) {
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(data.length / pageSize);

  const paginatedData = data.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="space-y-4 w-full">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead
                className={cn(column.accessor === "date" && "hidden md:inline")}
                key={index}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => {
                const isExpense = row["category"] === "Expense";

                const shouldHighlight = isExpense && column.accessor !== "name";

                const displayAmountFormat =
                  column.accessor === "amount" && `$${row[column.accessor]}`;

                return (
                  <TableCell key={colIndex} className="hover:cursor-pointer">
                    <div
                      className={cn(
                        "text-sm",
                        shouldHighlight && "text-red-500",
                        column.accessor === "date" && "hidden md:inline"
                      )}
                    >
                      {String(displayAmountFormat || row[column.accessor])}
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between">
        <Button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
          className="hover:cursor-pointer rounded"
        >
          Previous
        </Button>
        <p className="text-sm">
          Page {page + 1} of {pageCount}
        </p>
        <Button
          onClick={() => setPage((p) => Math.min(p + 1, pageCount - 1))}
          disabled={page === pageCount - 1}
          className="hover:cursor-pointer rounded"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
