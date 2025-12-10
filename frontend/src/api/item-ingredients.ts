import { ItemIngredientServiceClient } from '@/proto/item_ingredient/item_ingredient.client';
import { grpcTransport } from './grpc-client';

// Get item ingredients using gRPC
export const getItemIngredients = async (itemUuid: string) => {
    const client = new ItemIngredientServiceClient(grpcTransport);
    const call = await client.getItemIngredients({
        uuidItem: itemUuid,
    });
    const response = call.response
    return {
        success: response.success,
        message: response.message,
        data: response.itemIngredients,
    };
};

// Add item ingredient using gRPC
export const addItemIngredient = async (itemUuid: string, ingredientUuid: string) => {
    const client = new ItemIngredientServiceClient(grpcTransport);
    const call = await client.addItemIngredient({
        uuidItem: itemUuid,
        uuidIngredient: ingredientUuid,
    });
    const response = call.response
    return {
        success: response.success,
        message: response.message,
    };
};

// Remove item ingredient using gRPC
export const removeItemIngredient = async (itemUuid: string, ingredientUuid: string) => {
    const client = new ItemIngredientServiceClient(grpcTransport);
    const call = await client.deleteItemIngredient({
        uuidItem: itemUuid,
        uuidIngredient: ingredientUuid,
    });
    const response = call.response
    return {
        success: response.success,
        message: response.message,
    };
};

