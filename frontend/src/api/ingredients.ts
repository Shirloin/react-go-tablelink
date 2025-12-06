import type Ingredient from "@/types/ingredient";
import axios from "./axios";

export const getIngredients = async (page: number, limit: number) => {
    const response = await axios.get("/ingredients", {
        params: {
            page,
            limit,
        },
    })
    return response.data
};

export const createIngredient = async (ingredient: Ingredient) => {
    const response = await axios.post("/ingredients", ingredient)
    return response.data
};

export const updateIngredient = async (uuid: string, ingredient: Ingredient) => {
    const response = await axios.put(`/ingredients/${uuid}`, ingredient)
    return response.data
};

export const deleteIngredient = async (uuid: string) => {
    const response = await axios.delete(`/ingredients/${uuid}`)
    return response.data
}