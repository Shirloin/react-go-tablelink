package domain

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Item represents the tm_item table
type Item struct {
	UUID      uuid.UUID      `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"uuid"`
	Name      string         `gorm:"type:varchar(255);not null" json:"name"`
	Price     float64        `gorm:"type:decimal(10,2);not null" json:"price"`
	Status    int            `gorm:"type:integer;default:1" json:"status"` // 0: inactive, 1: active
	CreatedAt *time.Time     `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt *time.Time     `gorm:"autoUpdateTime" json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deleted_at,omitempty"`

	// Relationships
	Ingredients []Ingredient `gorm:"many2many:tm_item_ingredient;foreignKey:UUID;joinForeignKey:uuid_item;References:UUID;joinReferences:uuid_ingredient" json:"ingredients,omitempty"`
}

// TableName specifies the table name for GORM
func (Item) TableName() string {
	return "tm_item"
}
