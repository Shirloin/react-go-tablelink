import type { IItemRepository } from '../../repositories/IItemRepository';
import type { Item } from '../../entities/Item';

/**
 * Update Item Use Case - Application-specific business rule
 */
export class UpdateItemUseCase {
  constructor(private itemRepository: IItemRepository) {}

  async execute(uuid: string, item: Item): Promise<Item> {
    if (!uuid) {
      throw new Error('Item UUID is required');
    }
    if (item.name !== undefined && item.name.trim() === '') {
      throw new Error('Item name cannot be empty');
    }
    if (item.price !== undefined && item.price < 0) {
      throw new Error('Item price cannot be negative');
    }
    return this.itemRepository.updateItem(uuid, item);
  }
}

