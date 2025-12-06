import type { ColumnDef } from "@tanstack/react-table";
import type Ingredient from "@/types/ingredient";

export const columns: ColumnDef<Ingredient>[] = [
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
      return typeMap[type] || "Unknown";
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      return row.original.status === 1 ? "Active" : "Inactive";
    },
  },
];
