package repository

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/shirloin/react-go-prac/internal/domain"
)

type ItemIngredientRepository struct {
	pool *pgxpool.Pool
}

func NewItemIngredientRepository(pool *pgxpool.Pool) *ItemIngredientRepository {
	return &ItemIngredientRepository{pool: pool}
}

func (r *ItemIngredientRepository) Add(ctx context.Context, uuidItem string, uuidIngredient string) error {
	query := `INSERT INTO tm_item_ingredient (uuid_item, uuid_ingredient) VALUES ($1, $2) ON CONFLICT DO NOTHING`

	_, err := r.pool.Exec(ctx, query, uuidItem, uuidIngredient)
	if err != nil {
		return err
	}
	return nil
}

func (r *ItemIngredientRepository) Delete(ctx context.Context, uuidItem string, uuidIngredient string) error {
	query := `DELETE FROM tm_item_ingredient WHERE uuid_item = $1 AND uuid_ingredient = $2`

	_, err := r.pool.Exec(ctx, query, uuidItem, uuidIngredient)
	if err != nil {
		return err
	}
	return nil
}

func (r *ItemIngredientRepository) GetByItemUUID(ctx context.Context, uuidItem string) ([]domain.ItemIngredient, error) {
	query := `SELECT uuid_item, uuid_ingredient FROM tm_item_ingredient WHERE uuid_item = $1`

	rows, err := r.pool.Query(ctx, query, uuidItem)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var itemIngredients []domain.ItemIngredient
	for rows.Next() {
		var itemIngredient domain.ItemIngredient
		err := rows.Scan(&itemIngredient.UUIDItem, &itemIngredient.UUIDIngredient)
		if err != nil {
			return nil, err
		}
		itemIngredients = append(itemIngredients, itemIngredient)
	}

	return itemIngredients, nil
}
