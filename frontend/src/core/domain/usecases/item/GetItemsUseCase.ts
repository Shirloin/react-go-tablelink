import type { IItemRepository } from '../../repositories/IItemRepository';
import type { PaginatedResponse } from '../../entities/Pagination';
import type { Item } from '../../entities/Item';

/**
 * Get Items Use Case - Application-specific business rule
 */
export class GetItemsUseCase {
  constructor(private itemRepository: IItemRepository) {}

  async execute(page: number, limit: number): Promise<PaginatedResponse<Item>> {
    if (page < 0) {
      throw new Error('Page must be non-negative');
    }
    if (limit <= 0) {
      throw new Error('Limit must be positive');
    }
    return this.itemRepository.getItems(page, limit);
  }
}

