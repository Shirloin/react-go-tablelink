package repository

import "github.com/jackc/pgx/v5/pgxpool"

type Repositories struct {
	IngredientRepository     IngredientRepository
	ItemRepository           ItemRepository
	ItemIngredientRepository ItemIngredientRepository
}

func InitRepositories(pool *pgxpool.Pool) *Repositories {
	return &Repositories{
		IngredientRepository:     *NewIngredientRepository(pool),
		ItemRepository:           *NewItemRepository(pool),
		ItemIngredientRepository: *NewItemIngredientRepository(pool),
	}
}
