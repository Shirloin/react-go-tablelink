import type { ColumnDef } from "@tanstack/react-table";
import type Item from "@/types/item";
import type { DataTableRowAction } from "@/types/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export const getItemColumns = ({
  setRowAction,
}: {
  setRowAction: (action: DataTableRowAction<Item> | null) => void;
}): ColumnDef<Item>[] => {
  return [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = row.getValue("price") as number;
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price);
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as number;
        return status === 1 ? "Active" : "Inactive";
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setRowAction({ action: "update", row: row })}
              >
                Update
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setRowAction({ action: "delete", row: row })}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
