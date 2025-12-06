package usecase

import (
	"context"

	"github.com/google/uuid"
	"github.com/shirloin/react-go-prac/internal/domain"
	"github.com/shirloin/react-go-prac/internal/repository"
)

type IngredientUsecase struct {
	ingredientRepository repository.IngredientRepository
}

func NewIngredientUsecase(ingredientRepository repository.IngredientRepository) *IngredientUsecase {
	return &IngredientUsecase{ingredientRepository: ingredientRepository}
}

func (u *IngredientUsecase) GetAll(ctx context.Context, limit int, offset int) ([]domain.Ingredient, *domain.Pagination, error) {
	return u.ingredientRepository.GetAll(ctx, limit, offset)
}

func (u *IngredientUsecase) Create(ctx context.Context, ingredient domain.Ingredient) (domain.Ingredient, error) {
	ingredient.UUID = uuid.New()
	return u.ingredientRepository.Create(ctx, ingredient)
}

func (u *IngredientUsecase) Update(ctx context.Context, uuid string, ingredient domain.Ingredient) (domain.Ingredient, error) {
	return u.ingredientRepository.Update(ctx, uuid, ingredient)
}

func (u *IngredientUsecase) Delete(ctx context.Context, uuid string) error {
	return u.ingredientRepository.Delete(ctx, uuid)
}
