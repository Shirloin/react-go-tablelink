import type { IItemIngredientRepository } from '../../repositories/IItemIngredientRepository';
import type { ItemIngredient } from '../../entities/ItemIngredient';

/**
 * Get Item Ingredients Use Case - Application-specific business rule
 */
export class GetItemIngredientsUseCase {
  constructor(private itemIngredientRepository: IItemIngredientRepository) {}

  async execute(itemUuid: string): Promise<ItemIngredient[]> {
    if (!itemUuid) {
      throw new Error('Item UUID is required');
    }
    return this.itemIngredientRepository.getItemIngredients(itemUuid);
  }
}

