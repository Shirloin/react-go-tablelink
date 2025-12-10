import type { IItemIngredientRepository } from '../../repositories/IItemIngredientRepository';

/**
 * Add Item Ingredient Use Case - Application-specific business rule
 */
export class AddItemIngredientUseCase {
  constructor(private itemIngredientRepository: IItemIngredientRepository) {}

  async execute(itemUuid: string, ingredientUuid: string): Promise<void> {
    if (!itemUuid) {
      throw new Error('Item UUID is required');
    }
    if (!ingredientUuid) {
      throw new Error('Ingredient UUID is required');
    }
    return this.itemIngredientRepository.addItemIngredient(itemUuid, ingredientUuid);
  }
}

