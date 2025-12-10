/**
 * Ingredient represents the tm_ingredient table - Core business entity
 */
export interface Ingredient {
  uuid?: string;
  name?: string;
  cause_alergy?: boolean;
  type?: number; // 0: none, 1: veggie, 2: vegan
  status?: number; // 0: inactive, 1: active
  created_at?: string; // ISO date string
  updated_at?: string; // ISO date string
  deleted_at?: string | null; // ISO date string or null
}

