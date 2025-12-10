import type { IIngredientRepository } from '../../core/domain/repositories/IIngredientRepository';
import type { Ingredient } from '../../core/domain/entities/Ingredient';
import type { PaginatedResponse } from '../../core/domain/entities/Pagination';
import axiosInstance from '../api/axios/axiosInstance';
import { API_ENDPOINTS } from '../api/endpoints';

/**
 * Ingredient Repository Implementation - Infrastructure layer
 * Handles HTTP communication with the backend
 */
export class IngredientRepositoryImpl implements IIngredientRepository {
  async getIngredients(page: number, limit: number): Promise<PaginatedResponse<Ingredient>> {
    const response = await axiosInstance.get(API_ENDPOINTS.ingredients.list, {
      params: { page, limit },
    });
    return response.data;
  }

  async createIngredient(ingredient: Ingredient): Promise<Ingredient> {
    const response = await axiosInstance.post(API_ENDPOINTS.ingredients.create, ingredient);
    return response.data;
  }

  async updateIngredient(uuid: string, ingredient: Ingredient): Promise<Ingredient> {
    const response = await axiosInstance.put(API_ENDPOINTS.ingredients.update(uuid), ingredient);
    return response.data;
  }

  async deleteIngredient(uuid: string): Promise<void> {
    await axiosInstance.delete(API_ENDPOINTS.ingredients.delete(uuid));
  }
}
