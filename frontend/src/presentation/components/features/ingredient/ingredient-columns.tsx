import type { ColumnDef } from "@tanstack/react-table";
import type { Ingredient } from "@/core/domain/entities/Ingredient";
import type { DataTableRowAction } from "@/shared/types/common";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export const getIngredientColumns = ({
  setRowAction,
}: {
  setRowAction: (action: DataTableRowAction<Ingredient> | null) => void;
}): ColumnDef<Ingredient>[] => {
  return [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "cause_alergy",
      header: "Causes Allergy",
      cell: ({ row }) => {
        return row.original.cause_alergy ? "Yes" : "No";
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.original.type;
        const typeMap: Record<number, string> = {
          0: "None",
          1: "Veggie",
          2: "Vegan",
        };
        return typeMap[type ?? 0] || "Unknown";
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return row.original.status === 1 ? "Active" : "Inactive";
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
