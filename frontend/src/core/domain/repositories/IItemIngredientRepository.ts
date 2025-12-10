import type { ItemIngredient } from '../entities/ItemIngredient';

/**
 * ItemIngredient Repository Interface - Defines data access contract for ItemIngredients
 * Implementation belongs in infrastructure layer
 */
export interface IItemIngredientRepository {
  getItemIngredients(itemUuid: string): Promise<ItemIngredient[]>;
  addItemIngredient(itemUuid: string, ingredientUuid: string): Promise<void>;
  removeItemIngredient(itemUuid: string, ingredientUuid: string): Promise<void>;
}

