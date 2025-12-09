package usecase

import (
	"context"
	"errors"

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

func (u *IngredientUsecase) GetByUUID(ctx context.Context, uuid string) (domain.Ingredient, error) {
	return u.ingredientRepository.GetByUUID(ctx, uuid)
}

func (u *IngredientUsecase) Create(ctx context.Context, ingredient domain.Ingredient) (domain.Ingredient, error) {
	// Validate name uniqueness
	exists, err := u.ingredientRepository.CheckNameExists(ctx, ingredient.Name, "")
	if err != nil {
		return domain.Ingredient{}, err
	}
	if exists {
		return domain.Ingredient{}, errors.New("ingredient name already exists")
	}

	ingredient.UUID = uuid.New()
	return u.ingredientRepository.Create(ctx, ingredient)
}

func (u *IngredientUsecase) Update(ctx context.Context, uuid string, ingredient domain.Ingredient) (domain.Ingredient, error) {
	// Validate name uniqueness (excluding current UUID)
	exists, err := u.ingredientRepository.CheckNameExists(ctx, ingredient.Name, uuid)
	if err != nil {
		return domain.Ingredient{}, err
	}
	if exists {
		return domain.Ingredient{}, errors.New("ingredient name already exists")
	}

	return u.ingredientRepository.Update(ctx, uuid, ingredient)
}

func (u *IngredientUsecase) Delete(ctx context.Context, uuid string) error {
	return u.ingredientRepository.Delete(ctx, uuid)
}
