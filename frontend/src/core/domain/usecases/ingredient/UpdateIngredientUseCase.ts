import type { IIngredientRepository } from '../../repositories/IIngredientRepository';
import type { Ingredient } from '../../entities/Ingredient';

/**
 * Update Ingredient Use Case - Application-specific business rule
 */
export class UpdateIngredientUseCase {
  constructor(private ingredientRepository: IIngredientRepository) {}

  async execute(uuid: string, ingredient: Ingredient): Promise<Ingredient> {
    if (!uuid) {
      throw new Error('Ingredient UUID is required');
    }
    if (ingredient.name !== undefined && ingredient.name.trim() === '') {
      throw new Error('Ingredient name cannot be empty');
    }
    return this.ingredientRepository.updateIngredient(uuid, ingredient);
  }
}

