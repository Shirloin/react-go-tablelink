import type { Table as TanstackTable } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface DataTablePaginationProps<TData> {
  table: TanstackTable<TData>;
}
export default function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <>
      <div className="flex  gap-2.5 w-full">
        <div className="flex flex-row gap-2.5 items-center justify-between">
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Page size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-500"> {table.getRowCount()} items</p>
        </div>
        <div className="flex flex-row gap-2.5 items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
          <p>
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
