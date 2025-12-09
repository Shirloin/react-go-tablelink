import useDataTable from "@/hooks/use-data-table";
import { getItemColumns } from "./item-columns";
import { useGetItems } from "@/hooks/use-items";
import CreateItemModal from "./create-item-modal";
import DataTable from "@/components/data-table/data-table";
import { useMemo, useState } from "react";
import type { DataTableRowAction } from "@/types/data-table";
import type Item from "@/types/item";
import UpdateItemModal from "./update-item-modal";
import DeleteItemModal from "./delete-item-modal";
import type { Updater, PaginationState } from "@tanstack/react-table";

export default function ItemTable() {
  const [rowAction, setRowAction] =
    useState<DataTableRowAction<Item> | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const onPaginationChange = (updater: Updater<PaginationState>) => {
    const old = pagination;
    const next = typeof updater === "function" ? updater(old) : updater;
    setPagination(next);
  };
  const { data } = useGetItems(pagination.pageIndex, pagination.pageSize);
  const columns = useMemo(() => getItemColumns({ setRowAction }), []);
  const { items, pagination: paginationData } = useMemo(() => {
    return {
      items: data?.data || [],
      pagination: data?.pagination || {
        total_items: 0,
        total_pages: 0,
        page: 0,
        limit: 10,
      },
    };
  }, [data]);

  const { table } = useDataTable({
    data: items || [],
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
        <CreateItemModal />
        <DataTable table={table} />
      </div>
      <UpdateItemModal
        open={rowAction?.action === "update"}
        onOpenChange={() => setRowAction(null)}
        item={rowAction?.row.original ?? null}
      />
      <DeleteItemModal
        open={rowAction?.action === "delete"}
        onOpenChange={() => setRowAction(null)}
        item={rowAction?.row.original ?? null}
      />
    </>
  );
}

