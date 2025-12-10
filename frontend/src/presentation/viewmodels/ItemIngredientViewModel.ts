import { useGetItemIngredients, useAddItemIngredient, useRemoveItemIngredient } from '../hooks/use-item-ingredients';

/**
 * ItemIngredient ViewModel - Presentation layer
 * Encapsulates presentation logic for ItemIngredients
 */
export function useItemIngredientViewModel() {
  const getItemIngredients = useGetItemIngredients;
  const addItemIngredient = useAddItemIngredient;
  const removeItemIngredient = useRemoveItemIngredient;

  return {
    getItemIngredients,
    addItemIngredient,
    removeItemIngredient,
  };
}

