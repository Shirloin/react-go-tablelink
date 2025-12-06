import type { ColumnDef } from "@tanstack/react-table";
import type Ingredient from "@/types/ingredient";
import { Button } from "@/components/ui/button";
import { EditIcon, TrashIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import type { DataTableRowAction } from "@/types/data-table";

interface IngredientColumnsProps {
  setRowAction: Dispatch<SetStateAction<DataTableRowAction<Ingredient> | null>>;
}

export const getIngredientColumns = ({
  setRowAction,
}: IngredientColumnsProps): ColumnDef<Ingredient>[] => [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Causes Allergy",
    accessorKey: "cause_alergy",
    cell: ({ row }) => {
      return row.original.cause_alergy ? "Yes" : "No";
    },
  },
  {
    header: "Type",
    accessorKey: "type",
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
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      return row.original.status === 1 ? "Active" : "Inactive";
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setRowAction({ row, action: "update" })}
          >
            <EditIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setRowAction({ row, action: "delete" })}
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];
