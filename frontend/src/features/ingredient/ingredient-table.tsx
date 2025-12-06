import useDataTable from "@/hooks/use-data-table";
import { getIngredientColumns } from "./ingredient-columns";
import { useGetIngredients } from "@/hooks/use-ingredients";
import CreateIngredientModal from "./create-ingredient-modal";
import DataTable from "@/components/data-table/data-table";
import { useMemo, useState } from "react";
import type { DataTableRowAction } from "@/types/data-table";
import type Ingredient from "@/types/ingredient";
import UpdateIngredientModal from "./update-ingredient-modal";
import DeleteIngredientModal from "./delete-ingredient-modal";
import type { Updater, PaginationState } from "@tanstack/react-table";

export default function IngredientTable() {
  const [rowAction, setRowAction] =
    useState<DataTableRowAction<Ingredient> | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const onPaginationChange = (updater: Updater<PaginationState>) => {
    const old = pagination;
    const next = typeof updater === "function" ? updater(old) : updater;
    setPagination(next);
  };
  const { data } = useGetIngredients(pagination.pageIndex, pagination.pageSize);
  const columns = useMemo(() => getIngredientColumns({ setRowAction }), []);
  const { ingredients, pagination: paginationData } = useMemo(() => {
    return {
      ingredients: data?.data || [],
      pagination: data?.pagination || {
        total_items: 0,
        total_pages: 0,
        page: 0,
        limit: 10,
      },
    };
  }, [data]);

  const { table } = useDataTable({
    data: ingredients || [],
    columns: columns,
    rowCount: paginationData.total_items,
    pageCount: paginationData.total_pages,
    initialState: {
      pagination,
    },
    onPaginationChange: onPaginationChange,
  });

  return (
    <>
      <div className="container mx-auto max-w-5xl">
        <CreateIngredientModal />
        <DataTable table={table} />
      </div>
      <UpdateIngredientModal
        open={rowAction?.action === "update"}
        onOpenChange={() => setRowAction(null)}
        ingredient={rowAction?.row.original ?? null}
      />
      <DeleteIngredientModal
        open={rowAction?.action === "delete"}
        onOpenChange={() => setRowAction(null)}
        ingredient={rowAction?.row.original ?? null}
      />
    </>
  );
}
