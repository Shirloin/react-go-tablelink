import { ItemRepositoryImpl } from '../infrastructure/repositories';
import { IngredientRepositoryImpl } from '../infrastructure/repositories';
import { ItemIngredientRepositoryImpl } from '../infrastructure/repositories';
import {
    GetItemsUseCase,
    GetItemUseCase,
    CreateItemUseCase,
    UpdateItemUseCase,
    DeleteItemUseCase,
} from '../core/domain/usecases/item';
import {
    GetIngredientsUseCase,
    CreateIngredientUseCase,
    UpdateIngredientUseCase,
    DeleteIngredientUseCase,
} from '../core/domain/usecases/ingredient';
import {
    GetItemIngredientsUseCase,
    AddItemIngredientUseCase,
    RemoveItemIngredientUseCase,
} from '../core/domain/usecases/item-ingredient';

/**
 * Dependency Injection Container
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

