import { useGetItems, useCreateItem, useUpdateItem, useDeleteItem } from '../hooks/use-items';
import type { Item } from '../../core/domain/entities/Item';

/**
 * Item ViewModel - Presentation layer
 * Encapsulates presentation logic for Items
 */
export function useItemViewModel() {
  const getItems = useGetItems;
  const createItem = useCreateItem;
  const updateItem = useUpdateItem;
  const deleteItem = useDeleteItem;

  return {
    getItems,
    createItem,
    updateItem,
    deleteItem,
  };
}

