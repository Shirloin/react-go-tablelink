import axios from "./axios";

export const addItemIngredient = async (itemUuid: string, ingredientUuid: string) => {
    const response = await axios.post(`/items/${itemUuid}/ingredients`, {
        uuid_ingredient: ingredientUuid,
    })
    return response.data
};

export const removeItemIngredient = async (itemUuid: string, ingredientUuid: string) => {
    const response = await axios.delete(`/items/${itemUuid}/ingredients/${ingredientUuid}`)
    return response.data
};

