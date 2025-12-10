import type { Row } from "@tanstack/react-table";

/**
 * Common types used across the application
 */

export interface DataTableRowAction<TData> {
  row: Row<TData>;
  action: "update" | "delete";
}

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

