import type { IItemRepository } from '../../repositories/IItemRepository';
import type { Item } from '../../entities/Item';

/**
 * Create Item Use Case - Application-specific business rule
 */
export class CreateItemUseCase {
  constructor(private itemRepository: IItemRepository) {}

  async execute(item: Item): Promise<Item> {
    if (!item.name || item.name.trim() === '') {
      throw new Error('Item name is required');
    }
    if (item.price !== undefined && item.price < 0) {
      throw new Error('Item price cannot be negative');
    }
    return this.itemRepository.createItem(item);
  }
}

