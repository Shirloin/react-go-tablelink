package domain

import (
	"context"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Ingredient represents the tm_ingredient table
type Ingredient struct {
	UUID        uuid.UUID      `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"uuid"`
	Name        string         `gorm:"type:varchar(255);not null" json:"name"`
	CauseAlergy bool           `gorm:"type:boolean;default:false" json:"cause_alergy"`
	Type        int            `gorm:"type:integer;default:0" json:"type"`   // 0: none, 1: veggie, 2: vegan
	Status      int            `gorm:"type:integer;default:1" json:"status"` // 0: inactive, 1: active
	CreatedAt   *time.Time     `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt   *time.Time     `gorm:"autoUpdateTime" json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"deleted_at,omitempty"`
}

// TableName specifies the table name for GORM
func (Ingredient) TableName() string {
	return "tm_ingredient"
}

type IngredientRepository interface {
	GetAll(ctx context.Context, limit int, offset int) ([]Ingredient, error)
	Create(ctx context.Context, ingredient Ingredient) (Ingredient, error)
	Update(ctx context.Context, ingredient Ingredient) (Ingredient, error)
	Delete(ctx context.Context, id string) error
}

type IngredientUsecase interface {
	GetAll(ctx context.Context, limit int, offset int) ([]Ingredient, error)
	Create(ctx context.Context, ingredient Ingredient) (Ingredient, error)
	Update(ctx context.Context, ingredient Ingredient) (Ingredient, error)
	Delete(ctx context.Context, id string) error
}
