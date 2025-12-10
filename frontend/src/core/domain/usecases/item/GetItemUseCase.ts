import type { IItemRepository } from '../../repositories/IItemRepository';
import type { Item } from '../../entities/Item';

/**
 * Get Item Use Case - Application-specific business rule
 */
export class GetItemUseCase {
  constructor(private itemRepository: IItemRepository) {}

  async execute(uuid: string): Promise<Item> {
    if (!uuid) {
      throw new Error('Item UUID is required');
    }
    return this.itemRepository.getItem(uuid);
  }
}

