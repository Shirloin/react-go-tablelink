import { createIngredient, deleteIngredient, getIngredients, updateIngredient } from "@/api/ingredients";
import type Ingredient from "@/types/ingredient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetIngredients = (page: number, limit: number) => {
    return useQuery({
        queryKey: ["getIngredients", page, limit],
        queryFn: async () => {
            const response = await getIngredients(page, limit)
            return response
        },
    })
}

export const useCreateIngredient = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (ingredient: Ingredient) => {
            const response = await createIngredient(ingredient)
            return response.data
        },
        mutationKey: ["createIngredient"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getIngredients"] })
        }
    })
}

export const useUpdateIngredient = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ uuid, ingredient }: { uuid: string, ingredient: Ingredient }) => {
            const response = await updateIngredient(uuid, ingredient)
            return response.data
        },
        mutationKey: ["updateIngredient"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getIngredients"] })
        }
    })
}

export const useDeleteIngredient = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (uuid: string) => {
            const response = await deleteIngredient(uuid)
            return response.data
        },
        mutationKey: ["deleteIngredient"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getIngredients"] })
        }
    })
}