import { CreateItemUseCase, DeleteItemUseCase, GetItemUseCase, GetItemsUseCase, UpdateItemUseCase } from '@/core/domain/usecases/item';
import { ItemRepositoryImpl } from '../repositories';
import { IngredientRepositoryImpl } from '../repositories';
import { ItemIngredientRepositoryImpl } from '../repositories';
import { CreateIngredientUseCase, DeleteIngredientUseCase, GetIngredientsUseCase, UpdateIngredientUseCase } from '@/core/domain/usecases/ingredient';
import { AddItemIngredientUseCase, GetItemIngredientsUseCase, RemoveItemIngredientUseCase } from '@/core/domain/usecases/item-ingredient';

/**
 * Dependency Injection Container - Infrastructure layer
 * Creates and wires up all dependencies following Clean Architecture
 */
class DIContainer {
  // Repositories
  private _itemRepository = new ItemRepositoryImpl();
  private _ingredientRepository = new IngredientRepositoryImpl();
  private _itemIngredientRepository = new ItemIngredientRepositoryImpl();

  // Item Use Cases
  getItemsUseCase = new GetItemsUseCase(this._itemRepository);
  getItemUseCase = new GetItemUseCase(this._itemRepository);
  createItemUseCase = new CreateItemUseCase(this._itemRepository);
  updateItemUseCase = new UpdateItemUseCase(this._itemRepository);
  deleteItemUseCase = new DeleteItemUseCase(this._itemRepository);

  // Ingredient Use Cases
  getIngredientsUseCase = new GetIngredientsUseCase(this._ingredientRepository);
  createIngredientUseCase = new CreateIngredientUseCase(this._ingredientRepository);
  updateIngredientUseCase = new UpdateIngredientUseCase(this._ingredientRepository);
  deleteIngredientUseCase = new DeleteIngredientUseCase(this._ingredientRepository);

  // ItemIngredient Use Cases
  getItemIngredientsUseCase = new GetItemIngredientsUseCase(this._itemIngredientRepository);
  addItemIngredientUseCase = new AddItemIngredientUseCase(this._itemIngredientRepository);
  removeItemIngredientUseCase = new RemoveItemIngredientUseCase(this._itemIngredientRepository);
}

export const container = new DIContainer();

