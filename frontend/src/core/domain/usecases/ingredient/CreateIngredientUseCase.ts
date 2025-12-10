import type { IIngredientRepository } from '../../repositories/IIngredientRepository';
import type { Ingredient } from '../../entities/Ingredient';

/**
 * Create Ingredient Use Case - Application-specific business rule
 */
export class CreateIngredientUseCase {
  constructor(private ingredientRepository: IIngredientRepository) {}

  async execute(ingredient: Ingredient): Promise<Ingredient> {
    if (!ingredient.name || ingredient.name.trim() === '') {
      throw new Error('Ingredient name is required');
    }
    return this.ingredientRepository.createIngredient(ingredient);
  }
}

