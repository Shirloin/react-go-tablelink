package repository

import "github.com/jackc/pgx/v5/pgxpool"

type Repositories struct {
	IngredientRepository IngredientRepository
}

func InitRepositories(pool *pgxpool.Pool) *Repositories {
	return &Repositories{
		IngredientRepository: *NewIngredientRepository(pool),
	}
}
