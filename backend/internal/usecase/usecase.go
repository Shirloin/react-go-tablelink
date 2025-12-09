package usecase

import (
	"github.com/shirloin/react-go-prac/internal/repository"
)

type Usecases struct {
	IngredientUsecase     IngredientUsecase
	ItemUsecase           ItemUsecase
	ItemIngredientUsecase ItemIngredientUsecase
}

func InitUsecases(repositories *repository.Repositories) *Usecases {
	return &Usecases{
		IngredientUsecase:     *NewIngredientUsecase(repositories.IngredientRepository),
		ItemUsecase:           *NewItemUsecase(repositories.ItemRepository),
		ItemIngredientUsecase: *NewItemIngredientUsecase(repositories.ItemIngredientRepository),
	}
}
