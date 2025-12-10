import type { Ingredient } from '../entities/Ingredient';
import type { PaginatedResponse } from '../entities/Pagination';

/**
 * Ingredient Repository Interface - Defines data access contract for Ingredients
 * Implementation belongs in infrastructure layer
 */
export interface IIngredientRepository {
  getIngredients(page: number, limit: number): Promise<PaginatedResponse<Ingredient>>;
  createIngredient(ingredient: Ingredient): Promise<Ingredient>;
  updateIngredient(uuid: string, ingredient: Ingredient): Promise<Ingredient>;
  deleteIngredient(uuid: string): Promise<void>;
}

