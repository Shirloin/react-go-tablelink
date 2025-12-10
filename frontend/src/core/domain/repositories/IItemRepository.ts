import type { Item } from '../entities/Item';
import type { PaginatedResponse } from '../entities/Pagination';

/**
 * Item Repository Interface - Defines data access contract for Items
 * Implementation belongs in infrastructure layer
 */
export interface IItemRepository {
  getItems(page: number, limit: number): Promise<PaginatedResponse<Item>>;
  getItem(uuid: string): Promise<Item>;
  createItem(item: Item): Promise<Item>;
  updateItem(uuid: string, item: Item): Promise<Item>;
  deleteItem(uuid: string): Promise<void>;
}

