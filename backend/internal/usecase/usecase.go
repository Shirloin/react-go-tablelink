package usecase

import (
	"github.com/shirloin/react-go-prac/internal/repository"
)

type Usecases struct {
	IngredientUsecase IngredientUsecase
}

func InitUsecases(repositories *repository.Repositories) *Usecases {
	return &Usecases{
		IngredientUsecase: *NewIngredientUsecase(repositories.IngredientRepository),
	}
}
