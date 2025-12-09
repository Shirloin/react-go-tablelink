package usecase

import (
	"context"
	"errors"

	"github.com/google/uuid"
	"github.com/shirloin/react-go-prac/internal/domain"
	"github.com/shirloin/react-go-prac/internal/repository"
)

type ItemUsecase struct {
	itemRepository repository.ItemRepository
}

func NewItemUsecase(itemRepository repository.ItemRepository) *ItemUsecase {
	return &ItemUsecase{itemRepository: itemRepository}
}

func (u *ItemUsecase) GetAll(ctx context.Context, limit int, offset int) ([]domain.Item, *domain.Pagination, error) {
	return u.itemRepository.GetAll(ctx, limit, offset)
}

func (u *ItemUsecase) GetByUUID(ctx context.Context, uuid string) (domain.Item, error) {
	return u.itemRepository.GetByUUID(ctx, uuid)
}

func (u *ItemUsecase) Create(ctx context.Context, item domain.Item) (domain.Item, error) {
	// Validate required fields
	if item.Name == "" {
		return domain.Item{}, errors.New("item name is required")
	}
	if item.Price < 0 {
		return domain.Item{}, errors.New("item price must be non-negative")
	}

	// Validate name uniqueness
	exists, err := u.itemRepository.CheckNameExists(ctx, item.Name, "")
	if err != nil {
		return domain.Item{}, err
	}
	if exists {
		return domain.Item{}, errors.New("item name already exists")
	}

	item.UUID = uuid.New()
	return u.itemRepository.Create(ctx, item)
}

func (u *ItemUsecase) Update(ctx context.Context, uuid string, item domain.Item) (domain.Item, error) {
	// Validate required fields
	if item.Name == "" {
		return domain.Item{}, errors.New("item name is required")
	}
	if item.Price < 0 {
		return domain.Item{}, errors.New("item price must be non-negative")
	}

	// Validate name uniqueness (excluding current UUID)
	exists, err := u.itemRepository.CheckNameExists(ctx, item.Name, uuid)
	if err != nil {
		return domain.Item{}, err
	}
	if exists {
		return domain.Item{}, errors.New("item name already exists")
	}

	return u.itemRepository.Update(ctx, uuid, item)
}

func (u *ItemUsecase) Delete(ctx context.Context, uuid string) error {
	return u.itemRepository.Delete(ctx, uuid)
}
