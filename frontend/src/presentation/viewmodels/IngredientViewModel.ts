import { useGetIngredients, useCreateIngredient, useUpdateIngredient, useDeleteIngredient } from '../hooks/use-ingredients';

/**
 * Ingredient ViewModel - Presentation layer
 * Encapsulates presentation logic for Ingredients
 */
export function useIngredientViewModel() {
    const getIngredients = useGetIngredients;
    const createIngredient = useCreateIngredient;
    const updateIngredient = useUpdateIngredient;
    const deleteIngredient = useDeleteIngredient;

    return {
        getIngredients,
        createIngredient,
        updateIngredient,
        deleteIngredient,
    };
}

