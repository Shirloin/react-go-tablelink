import type { IItemRepository } from '../../core/domain/repositories/IItemRepository';
import type { Item } from '../../core/domain/entities/Item';
import type { PaginatedResponse } from '../../core/domain/entities/Pagination';
import axiosInstance from '../api/axios/axiosInstance';
import { API_ENDPOINTS } from '../api/endpoints';

/**
 * Item Repository Implementation - Infrastructure layer
 * Handles HTTP communication with the backend
 */
export class ItemRepositoryImpl implements IItemRepository {
  async getItems(page: number, limit: number): Promise<PaginatedResponse<Item>> {
    const response = await axiosInstance.get(API_ENDPOINTS.items.list, {
      params: { page, limit },
    });
    return response.data;
  }

  async getItem(uuid: string): Promise<Item> {
    const response = await axiosInstance.get(API_ENDPOINTS.items.detail(uuid));
    return response.data;
  }

  async createItem(item: Item): Promise<Item> {
    const response = await axiosInstance.post(API_ENDPOINTS.items.create, item);
    return response.data;
  }

  async updateItem(uuid: string, item: Item): Promise<Item> {
    const response = await axiosInstance.put(API_ENDPOINTS.items.update(uuid), item);
    return response.data;
  }

  async deleteItem(uuid: string): Promise<void> {
    await axiosInstance.delete(API_ENDPOINTS.items.delete(uuid));
  }
}
