import type { IIngredientRepository } from '../../repositories/IIngredientRepository';

/**
 * Delete Ingredient Use Case - Application-specific business rule
 */
export class DeleteIngredientUseCase {
  constructor(private ingredientRepository: IIngredientRepository) {}

  async execute(uuid: string): Promise<void> {
    if (!uuid) {
      throw new Error('Ingredient UUID is required');
    }
    return this.ingredientRepository.deleteIngredient(uuid);
  }
}

