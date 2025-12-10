import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { container } from "../../di/container";
import type { Item } from "../../core/domain/entities/Item";

/**
 * React Query hooks for Items - Presentation layer
 * Connects UI to use cases through dependency injection
 */
export const useGetItems = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["items", page, limit],
    queryFn: () => container.getItemsUseCase.execute(page, limit),
  });
};

export const useGetItem = (uuid: string, enabled = true) => {
  return useQuery({
    queryKey: ["item", uuid],
    queryFn: () => container.getItemUseCase.execute(uuid),
    enabled: enabled && !!uuid,
  });
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item: Item) => container.createItemUseCase.execute(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ uuid, item }: { uuid: string; item: Item }) =>
      container.updateItemUseCase.execute(uuid, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: string) => container.deleteItemUseCase.execute(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};
