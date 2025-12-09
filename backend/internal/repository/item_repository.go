package repository

import (
	"context"
	"database/sql"
	"strconv"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/shirloin/react-go-prac/internal/domain"
)

type ItemRepository struct {
	pool *pgxpool.Pool
}

func NewItemRepository(pool *pgxpool.Pool) *ItemRepository {
	return &ItemRepository{pool: pool}
}

func (r *ItemRepository) GetAll(ctx context.Context, limit int, offset int) ([]domain.Item, *domain.Pagination, error) {
	var items []domain.Item

	var totalItems int

	countQuery := `SELECT COUNT(*) FROM tm_item WHERE deleted_at IS NULL`
	err := r.pool.QueryRow(ctx, countQuery).Scan(&totalItems)
	if err != nil {
		return nil, nil, err
	}

	query := `SELECT uuid, name, price, status, created_at, updated_at, deleted_at
	          FROM tm_item WHERE deleted_at IS NULL ORDER BY created_at DESC LIMIT $1 OFFSET $2`
	rows, err := r.pool.Query(ctx, query, limit, offset)
	if err != nil {
		return nil, nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var item domain.Item
		var priceStr string
		err := rows.Scan(&item.UUID, &item.Name, &priceStr, &item.Status, &item.CreatedAt, &item.UpdatedAt, &item.DeletedAt)
		if err != nil {
			return nil, nil, err
		}
		// Convert price string to float64
		item.Price, err = strconv.ParseFloat(priceStr, 64)
		if err != nil {
			return nil, nil, err
		}
		items = append(items, item)
	}

	totalPages := (totalItems + limit - 1) / limit
	if totalPages == 0 {
		totalPages = 1
	}
	page := offset / limit

	pagination := domain.Pagination{
		TotalItems: totalItems,
		TotalPages: totalPages,
		Page:       page,
		Limit:      limit,
	}

	return items, &pagination, nil
}

func (r *ItemRepository) GetByUUID(ctx context.Context, uuid string) (domain.Item, error) {
	query := `SELECT uuid, name, price, status, created_at, updated_at, deleted_at
	          FROM tm_item WHERE uuid = $1 AND deleted_at IS NULL`

	var item domain.Item
	var priceStr string
	err := r.pool.QueryRow(ctx, query, uuid).Scan(
		&item.UUID,
		&item.Name,
		&priceStr,
		&item.Status,
		&item.CreatedAt,
		&item.UpdatedAt,
		&item.DeletedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return domain.Item{}, err
		}
		return domain.Item{}, err
	}

	// Convert price string to float64
	item.Price, err = strconv.ParseFloat(priceStr, 64)
	if err != nil {
		return domain.Item{}, err
	}

	// Fetch ingredients for this item
	ingredientQuery := `SELECT i.uuid, i.name, i.cause_alergy, i.type, i.status, i.created_at, i.updated_at, i.deleted_at
	                    FROM tm_ingredient i
	                    INNER JOIN tm_item_ingredient ii ON i.uuid = ii.uuid_ingredient
	                    WHERE ii.uuid_item = $1 AND i.deleted_at IS NULL`

	ingredientRows, err := r.pool.Query(ctx, ingredientQuery, uuid)
	if err == nil {
		defer ingredientRows.Close()
		for ingredientRows.Next() {
			var ingredient domain.Ingredient
			err := ingredientRows.Scan(
				&ingredient.UUID,
				&ingredient.Name,
				&ingredient.CauseAlergy,
				&ingredient.Type,
				&ingredient.Status,
				&ingredient.CreatedAt,
				&ingredient.UpdatedAt,
				&ingredient.DeletedAt,
			)
			if err == nil {
				item.Ingredients = append(item.Ingredients, ingredient)
			}
		}
	}

	return item, nil
}

func (r *ItemRepository) Create(ctx context.Context, item domain.Item) (domain.Item, error) {
	query := `INSERT INTO tm_item (uuid, name, price, status) VALUES ($1, $2, $3, $4) RETURNING uuid, name, price, status, created_at, updated_at, deleted_at`

	var result domain.Item
	var priceStr string

	err := r.pool.QueryRow(ctx, query,
		item.UUID,
		item.Name,
		item.Price,
		item.Status,
	).Scan(
		&result.UUID,
		&result.Name,
		&priceStr,
		&result.Status,
		&result.CreatedAt,
		&result.UpdatedAt,
		&result.DeletedAt,
	)
	if err != nil {
		return domain.Item{}, err
	}

	// Convert price string to float64
	result.Price, err = strconv.ParseFloat(priceStr, 64)
	if err != nil {
		return domain.Item{}, err
	}

	return result, nil
}

func (r *ItemRepository) Update(ctx context.Context, uuid string, item domain.Item) (domain.Item, error) {
	query := `UPDATE tm_item SET name = $1, price = $2, status = $3, updated_at = CURRENT_TIMESTAMP
	          WHERE uuid = $4 AND deleted_at IS NULL
	          RETURNING uuid, name, price, status, created_at, updated_at, deleted_at`

	var result domain.Item
	var priceStr string

	err := r.pool.QueryRow(ctx, query,
		item.Name,
		item.Price,
		item.Status,
		uuid,
	).Scan(
		&result.UUID,
		&result.Name,
		&priceStr,
		&result.Status,
		&result.CreatedAt,
		&result.UpdatedAt,
		&result.DeletedAt,
	)
	if err != nil {
		return domain.Item{}, err
	}

	// Convert price string to float64
	result.Price, err = strconv.ParseFloat(priceStr, 64)
	if err != nil {
		return domain.Item{}, err
	}

	return result, nil
}

func (r *ItemRepository) CheckNameExists(ctx context.Context, name string, excludeUUID string) (bool, error) {
	var count int
	query := `SELECT COUNT(*) FROM tm_item WHERE name = $1 AND deleted_at IS NULL`
	args := []interface{}{name}

	if excludeUUID != "" {
		query += ` AND uuid != $2`
		args = append(args, excludeUUID)
	}

	err := r.pool.QueryRow(ctx, query, args...).Scan(&count)
	if err != nil {
		return false, err
	}
	return count > 0, nil
}

func (r *ItemRepository) Delete(ctx context.Context, uuid string) error {
	query := `UPDATE tm_item SET deleted_at = NOW() WHERE uuid = $1`

	_, err := r.pool.Exec(ctx, query, uuid)
	if err != nil {
		return err
	}
	return nil
}
