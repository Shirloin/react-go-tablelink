package domain

import (
	"context"

	"github.com/google/uuid"
)

// ItemIngredient represents the tm_item_ingredient junction table
type ItemIngredient struct {
	UUIDItem       uuid.UUID `gorm:"type:uuid;primaryKey;column:uuid_item" json:"uuid_item"`
	UUIDIngredient uuid.UUID `gorm:"type:uuid;primaryKey;column:uuid_ingredient" json:"uuid_ingredient"`

	// Relationships
	Item       Item       `gorm:"foreignKey:UUIDItem;references:UUID" json:"item,omitempty"`
	Ingredient Ingredient `gorm:"foreignKey:UUIDIngredient;references:UUID" json:"ingredient,omitempty"`
}

// TableName specifies the table name for GORM
func (ItemIngredient) TableName() string {
	return "tm_item_ingredient"
}

type ItemIngredientRepository interface {
	Add(ctx context.Context, uuidItem string, uuidIngredient string) error
	Delete(ctx context.Context, uuidItem string, uuidIngredient string) error
	GetByItemUUID(ctx context.Context, uuidItem string) ([]ItemIngredient, error)
}

type ItemIngredientUsecase interface {
	Add(ctx context.Context, uuidItem string, uuidIngredient string) error
	Delete(ctx context.Context, uuidItem string, uuidIngredient string) error
	GetByItemUUID(ctx context.Context, uuidItem string) ([]ItemIngredient, error)
}
