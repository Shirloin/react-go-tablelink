import type { Ingredient } from './Ingredient';
import type { Item } from './Item';

/**
 * ItemIngredient represents the tm_item_ingredient junction table - Core business entity
 */
export interface ItemIngredient {
  uuid_item?: string;
  uuid_ingredient?: string;
  item?: Item; // Optional relationship
  ingredient?: Ingredient; // Optional relationship
}

