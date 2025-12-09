import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getItems, createItem, updateItem, deleteItem } from "@/api/items";
import type Item from "@/types/item";

export const useGetItems = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["items", page, limit],
    queryFn: () => getItems(page, limit),
  });
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item: Item) => createItem(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ uuid, item }: { uuid: string; item: Item }) =>
      updateItem(uuid, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: string) => deleteItem(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

