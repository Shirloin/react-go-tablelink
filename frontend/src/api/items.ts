import type Item from "@/types/item";
import axios from "./axios";

export const getItems = async (page: number, limit: number) => {
    const response = await axios.get("/items", {
        params: {
            page,
            limit,
        },
    })
    return response.data
};

export const getItem = async (uuid: string) => {
    const response = await axios.get(`/items/${uuid}`)
    return response.data
};

export const createItem = async (item: Item) => {
    const response = await axios.post("/items", item)
    return response.data
};

export const updateItem = async (uuid: string, item: Item) => {
    const response = await axios.put(`/items/${uuid}`, item)
    return response.data
};

export const deleteItem = async (uuid: string) => {
    const response = await axios.delete(`/items/${uuid}`)
    return response.data
}

