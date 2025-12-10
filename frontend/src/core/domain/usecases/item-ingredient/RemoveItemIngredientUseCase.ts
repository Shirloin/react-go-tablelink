import type { IItemIngredientRepository } from '../../repositories/IItemIngredientRepository';

/**
 * Remove Item Ingredient Use Case - Application-specific business rule
 */
export class RemoveItemIngredientUseCase {
  constructor(private itemIngredientRepository: IItemIngredientRepository) {}

  async execute(itemUuid: string, ingredientUuid: string): Promise<void> {
    if (!itemUuid) {
      throw new Error('Item UUID is required');
    }
    if (!ingredientUuid) {
      throw new Error('Ingredient UUID is required');
    }
    return this.itemIngredientRepository.removeItemIngredient(itemUuid, ingredientUuid);
  }
}

