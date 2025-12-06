import {
  useReactTable,
  type TableOptions,
  getCoreRowModel,
  type TableState,
} from "@tanstack/react-table";

interface UseDataTableProps<TData>
  extends Omit<TableOptions<TData>, "pageCount" | "getCoreRowModel">,
    Required<Pick<TableOptions<TData>, "pageCount">> {
  initialState?: Omit<Partial<TableState>, "sorting">;
}

export default function useDataTable<TData>({
  initialState,
  ...props
}: UseDataTableProps<TData>) {
  const table = useReactTable({
    ...props,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: {
      ...initialState,
    },
  });

  return { table };
}
