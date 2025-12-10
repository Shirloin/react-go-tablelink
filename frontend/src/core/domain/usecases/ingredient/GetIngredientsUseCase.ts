import type { IIngredientRepository } from '../../repositories/IIngredientRepository';
import type { PaginatedResponse } from '../../entities/Pagination';
import type { Ingredient } from '../../entities/Ingredient';

/**
 * Get Ingredients Use Case - Application-specific business rule
 */
export class GetIngredientsUseCase {
  constructor(private ingredientRepository: IIngredientRepository) {}

  async execute(page: number, limit: number): Promise<PaginatedResponse<Ingredient>> {
    if (page < 0) {
      throw new Error('Page must be non-negative');
    }
    if (limit <= 0) {
      throw new Error('Limit must be positive');
    }
    return this.ingredientRepository.getIngredients(page, limit);
  }
}

