import type { IItemRepository } from '../../repositories/IItemRepository';

/**
 * Delete Item Use Case - Application-specific business rule
 */
export class DeleteItemUseCase {
  constructor(private itemRepository: IItemRepository) {}

  async execute(uuid: string): Promise<void> {
    if (!uuid) {
      throw new Error('Item UUID is required');
    }
    return this.itemRepository.deleteItem(uuid);
  }
}

