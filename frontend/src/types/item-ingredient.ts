import type Ingredient from "./ingredient";
import type Item from "./item";

/**
 * ItemIngredient represents the tm_item_ingredient junction table
 */
export default interface ItemIngredient {
  uuid_item?: string;
  uuid_ingredient?: string;
  item?: Item; // Optional relationship
  ingredient?: Ingredient; // Optional relationship
}

