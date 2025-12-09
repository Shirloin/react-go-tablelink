package usecase

import (
	"context"

	"github.com/shirloin/react-go-prac/internal/domain"
	"github.com/shirloin/react-go-prac/internal/repository"
)

type ItemIngredientUsecase struct {
	itemIngredientRepository repository.ItemIngredientRepository
}

func NewItemIngredientUsecase(itemIngredientRepository repository.ItemIngredientRepository) *ItemIngredientUsecase {
	return &ItemIngredientUsecase{itemIngredientRepository: itemIngredientRepository}
}

func (u *ItemIngredientUsecase) Add(ctx context.Context, uuidItem string, uuidIngredient string) error {
	return u.itemIngredientRepository.Add(ctx, uuidItem, uuidIngredient)
}

func (u *ItemIngredientUsecase) Delete(ctx context.Context, uuidItem string, uuidIngredient string) error {
	return u.itemIngredientRepository.Delete(ctx, uuidItem, uuidIngredient)
}

func (u *ItemIngredientUsecase) GetByItemUUID(ctx context.Context, uuidItem string) ([]domain.ItemIngredient, error) {
	return u.itemIngredientRepository.GetByItemUUID(ctx, uuidItem)
}
