import type { IItemIngredientRepository } from '../../core/domain/repositories/IItemIngredientRepository';
import type { ItemIngredient } from '../../core/domain/entities/ItemIngredient';
import { ItemIngredientServiceClient } from '@/proto/item_ingredient/item_ingredient.client';
import { grpcTransport } from '../api/grpc-client';

/**
 * ItemIngredient Repository Implementation - Infrastructure layer
 * Handles gRPC communication with the backend
 */
export class ItemIngredientRepositoryImpl implements IItemIngredientRepository {
  async getItemIngredients(itemUuid: string): Promise<ItemIngredient[]> {
    const client = new ItemIngredientServiceClient(grpcTransport);
    const call = await client.getItemIngredients({
      uuidItem: itemUuid,
    });
    const response = call.response;

    // Map gRPC response (camelCase) to domain entities (snake_case)
    return (response.itemIngredients || []).map((ii) => ({
      uuid_item: ii.uuidItem || itemUuid,
      uuid_ingredient: ii.uuidIngredient,
    }));
  }

  async addItemIngredient(itemUuid: string, ingredientUuid: string): Promise<void> {
    const client = new ItemIngredientServiceClient(grpcTransport);
    await client.addItemIngredient({
      uuidItem: itemUuid,
      uuidIngredient: ingredientUuid,
    });
  }

  async removeItemIngredient(itemUuid: string, ingredientUuid: string): Promise<void> {
    const client = new ItemIngredientServiceClient(grpcTransport);
    await client.deleteItemIngredient({
      uuidItem: itemUuid,
      uuidIngredient: ingredientUuid,
    });
  }
}

