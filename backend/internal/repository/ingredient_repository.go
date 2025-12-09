package repository

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/shirloin/react-go-prac/internal/domain"
)

type IngredientRepository struct {
	pool *pgxpool.Pool
}

func NewIngredientRepository(pool *pgxpool.Pool) *IngredientRepository {
	return &IngredientRepository{pool: pool}
}

func (r *IngredientRepository) GetAll(ctx context.Context, limit int, offset int) ([]domain.Ingredient, *domain.Pagination, error) {
	var ingredients []domain.Ingredient

	var totalItems int

	countQuery := `SELECT COUNT(*) FROM tm_ingredient WHERE deleted_at IS NULL`
	err := r.pool.QueryRow(ctx, countQuery).Scan(&totalItems)
	if err != nil {
		return nil, nil, err
	}

	query := `SELECT uuid, name, cause_alergy, type, status, created_at, updated_at, deleted_at
	          FROM tm_ingredient WHERE deleted_at IS NULL ORDER BY created_at DESC LIMIT $1 OFFSET $2`
	rows, err := r.pool.Query(ctx, query, limit, offset)
	if err != nil {
		return nil, nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var ingredient domain.Ingredient
		err := rows.Scan(&ingredient.UUID, &ingredient.Name, &ingredient.CauseAlergy, &ingredient.Type, &ingredient.Status, &ingredient.CreatedAt, &ingredient.UpdatedAt, &ingredient.DeletedAt)
		if err != nil {
			return nil, nil, err
		}
		ingredients = append(ingredients, ingredient)
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

	return ingredients, &pagination, nil
}

func (r *IngredientRepository) Create(ctx context.Context, ingredient domain.Ingredient) (domain.Ingredient, error) {
	query := `INSERT INTO tm_ingredient (uuid, name, cause_alergy, type, status) VALUES ($1, $2, $3, $4, $5) RETURNING *`

	var result domain.Ingredient

	err := r.pool.QueryRow(ctx, query,
		ingredient.UUID,
		ingredient.Name,
		ingredient.CauseAlergy,
		ingredient.Type,
		ingredient.Status,
	).Scan(
		&result.UUID,
		&result.Name,
		&result.CauseAlergy,
		&result.Type,
		&result.Status,
		&result.CreatedAt,
		&result.UpdatedAt,
		&result.DeletedAt,
	)
	if err != nil {
		return domain.Ingredient{}, err
	}
	return result, nil
}

func (r *IngredientRepository) Update(ctx context.Context, uuid string, ingredient domain.Ingredient) (domain.Ingredient, error) {
	query := `UPDATE tm_ingredient SET name = $1, cause_alergy = $2, type = $3, status = $4 WHERE uuid = $5 RETURNING *`

	var result domain.Ingredient

	err := r.pool.QueryRow(ctx, query,
		ingredient.Name,
		ingredient.CauseAlergy,
		ingredient.Type,
		ingredient.Status,
		uuid,
	).Scan(
		&result.UUID,
		&result.Name,
		&result.CauseAlergy,
		&result.Type,
		&result.Status,
		&result.CreatedAt,
		&result.UpdatedAt,
		&result.DeletedAt,
	)
	if err != nil {
		return domain.Ingredient{}, err
	}
	return result, nil
}

func (r *IngredientRepository) GetByUUID(ctx context.Context, uuid string) (domain.Ingredient, error) {
	query := `SELECT uuid, name, cause_alergy, type, status, created_at, updated_at, deleted_at
	          FROM tm_ingredient WHERE uuid = $1 AND deleted_at IS NULL`

	var ingredient domain.Ingredient
	err := r.pool.QueryRow(ctx, query, uuid).Scan(
		&ingredient.UUID,
		&ingredient.Name,
		&ingredient.CauseAlergy,
		&ingredient.Type,
		&ingredient.Status,
		&ingredient.CreatedAt,
		&ingredient.UpdatedAt,
		&ingredient.DeletedAt,
	)
	if err != nil {
		return domain.Ingredient{}, err
	}
	return ingredient, nil
}

func (r *IngredientRepository) CheckNameExists(ctx context.Context, name string, excludeUUID string) (bool, error) {
	var count int
	query := `SELECT COUNT(*) FROM tm_ingredient WHERE name = $1 AND deleted_at IS NULL`
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

func (r *IngredientRepository) Delete(ctx context.Context, uuid string) error {
	query := `UPDATE tm_ingredient SET deleted_at = NOW() WHERE uuid = $1`

	_, err := r.pool.Exec(ctx, query, uuid)
	if err != nil {
		return err
	}
	return nil
}
