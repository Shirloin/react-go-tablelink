import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { container } from "../../di/container";
import type { Ingredient } from "../../core/domain/entities/Ingredient";

/**
 * React Query hooks for Ingredients - Presentation layer
 * Connects UI to use cases through dependency injection
 */
export const useGetIngredients = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["getIngredients", page, limit],
    queryFn: () => container.getIngredientsUseCase.execute(page, limit),
  });
};

export const useCreateIngredient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ingredient: Ingredient) =>
      container.createIngredientUseCase.execute(ingredient),
    mutationKey: ["createIngredient"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getIngredients"] });
    },
  });
};

export const useUpdateIngredient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ uuid, ingredient }: { uuid: string; ingredient: Ingredient }) =>
      container.updateIngredientUseCase.execute(uuid, ingredient),
    mutationKey: ["updateIngredient"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getIngredients"] });
    },
  });
};

export const useDeleteIngredient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: string) => container.deleteIngredientUseCase.execute(uuid),
    mutationKey: ["deleteIngredient"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getIngredients"] });
    },
  });
};
