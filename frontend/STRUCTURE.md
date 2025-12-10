# Frontend Architecture Structure

This document shows the final structure of the frontend codebase following Clean Architecture principles.

## Directory Structure

```
src/
├── core/                           # Core business logic (no framework dependencies)
│   ├── domain/
│   │   ├── entities/               # Business entities
│   │   │   ├── Item.ts
│   │   │   ├── Ingredient.ts
│   │   │   ├── ItemIngredient.ts
│   │   │   ├── Pagination.ts
│   │   │   └── index.ts
│   │   ├── repositories/           # Repository interfaces
│   │   │   ├── IItemRepository.ts
│   │   │   ├── IIngredientRepository.ts
│   │   │   ├── IItemIngredientRepository.ts
│   │   │   └── index.ts
│   │   └── usecases/               # Use cases (business logic)
│   │       ├── item/
│   │       │   ├── GetItemsUseCase.ts
│   │       │   ├── GetItemUseCase.ts
│   │       │   ├── CreateItemUseCase.ts
│   │       │   ├── UpdateItemUseCase.ts
│   │       │   ├── DeleteItemUseCase.ts
│   │       │   └── index.ts
│   │       ├── ingredient/
│   │       │   ├── GetIngredientsUseCase.ts
│   │       │   ├── CreateIngredientUseCase.ts
│   │       │   ├── UpdateIngredientUseCase.ts
│   │       │   ├── DeleteIngredientUseCase.ts
│   │       │   └── index.ts
│   │       └── item-ingredient/
│   │           ├── GetItemIngredientsUseCase.ts
│   │           ├── AddItemIngredientUseCase.ts
│   │           ├── RemoveItemIngredientUseCase.ts
│   │           └── index.ts
│   └── application/
│       ├── dto/                    # Data Transfer Objects
│       │   ├── ItemDTO.ts
│       │   ├── IngredientDTO.ts
│       │   ├── ItemIngredientDTO.ts
│       │   └── index.ts
│       └── services/               # Service interfaces (optional)
│
├── infrastructure/                 # External concerns
│   ├── repositories/               # Repository implementations
│   │   ├── ItemRepositoryImpl.ts
│   │   ├── IngredientRepositoryImpl.ts
│   │   ├── ItemIngredientRepositoryImpl.ts
│   │   └── index.ts
│   ├── services/                   # Service implementations (optional)
│   └── api/                        # API clients
│       ├── axios/
│       │   ├── axiosInstance.ts
│       │   ├── interceptors.ts
│       │   └── index.ts
│       ├── endpoints.ts
│       └── grpc-client.ts
│
├── presentation/                   # UI layer
│   ├── components/
│   │   ├── common/                 # Reusable components (shadcn/ui)
│   │   └── features/               # Feature-specific components
│   │       ├── item/
│   │       │   ├── item-table.tsx
│   │       │   ├── item-columns.tsx
│   │       │   ├── create-item-modal.tsx
│   │       │   ├── update-item-modal.tsx
│   │       │   └── delete-item-modal.tsx
│   │       └── ingredient/
│   │           ├── ingredient-table.tsx
│   │           ├── ingredient-columns.tsx
│   │           ├── create-ingredient-modal.tsx
│   │           ├── update-ingredient-modal.tsx
│   │           └── delete-ingredient-modal.tsx
│   ├── pages/                      # Page components
│   │   ├── item-page.tsx
│   │   ├── ingredient-page.tsx
│   │   └── item-ingredient-page.tsx
│   ├── hooks/                      # React Query hooks
│   │   ├── use-items.ts
│   │   ├── use-ingredients.ts
│   │   ├── use-item-ingredients.ts
│   │   └── use-data-table.tsx
│   └── viewmodels/                 # ViewModels
│       ├── ItemViewModel.ts
│       ├── IngredientViewModel.ts
│       └── ItemIngredientViewModel.ts
│
├── di/                             # Dependency Injection
│   ├── container.ts                # DI container
│   └── providers/
│       ├── RepositoryProvider.tsx
│       └── ServiceProvider.tsx
│
├── shared/                         # Shared utilities
│   ├── utils/
│   │   ├── validation.ts
│   │   ├── formatting.ts
│   │   ├── cn.ts
│   │   └── index.ts
│   ├── constants/
│   │   └── config.ts
│   └── types/
│       └── common.ts
│
├── components/                     # UI component library (shadcn/ui)
│   ├── ui/                         # shadcn/ui components
│   └── data-table/                 # Custom data table components
│
├── App.tsx
└── main.tsx
```

## Key Points

1. **Core Domain**: Pure business logic with no external dependencies
2. **Infrastructure**: Handles external concerns (API, database, etc.)
3. **Presentation**: UI layer that connects to domain through hooks
4. **DI Container**: Centralized dependency management
5. **Shared**: Common utilities and types used across layers

## Import Paths

- Domain entities: `@/core/domain/entities/Item`
- Repository interfaces: `@/core/domain/repositories/IItemRepository`
- Use cases: `@/core/domain/usecases/item/GetItemsUseCase`
- DI container: `@/di/container`
- Presentation hooks: `@/presentation/hooks/use-items`
- Shared utilities: `@/shared/utils/validation`
- Shared types: `@/shared/types/common`

