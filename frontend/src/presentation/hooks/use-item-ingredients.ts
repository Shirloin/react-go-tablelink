import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { container } from "../../di/container";

/**
 * React Query hooks for ItemIngredients - Presentation layer
 * Connects UI to use cases through dependency injection
 */
export const useGetItemIngredients = (itemUuid: string, enabled = true) => {
  return useQuery({
    queryKey: ["item-ingredients", itemUuid],
    queryFn: () => container.getItemIngredientsUseCase.execute(itemUuid),
    enabled: enabled && !!itemUuid,
  });
};

export const useAddItemIngredient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemUuid, ingredientUuid }: { itemUuid: string; ingredientUuid: string }) =>
      container.addItemIngredientUseCase.execute(itemUuid, ingredientUuid),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["item-ingredients", variables.itemUuid],
      });
    },
  });
};

export const useRemoveItemIngredient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemUuid, ingredientUuid }: { itemUuid: string; ingredientUuid: string }) =>
      container.removeItemIngredientUseCase.execute(itemUuid, ingredientUuid),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["item-ingredients", variables.itemUuid],
      });
    },
  });
};
