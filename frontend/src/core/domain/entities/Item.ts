import type { Ingredient } from './Ingredient';

/**
 * Item represents the tm_item table - Core business entity
 */
export interface Item {
  uuid?: string;
  name?: string;
  price?: number; // decimal(10,2)
  status?: number; // 0: inactive, 1: active
  created_at?: string; // ISO date string
  updated_at?: string; // ISO date string
  deleted_at?: string | null; // ISO date string or null
  ingredients?: Ingredient[]; // Optional relationship
}

