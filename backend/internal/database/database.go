package database

import (
	"context"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/shirloin/react-go-prac/internal/config"
)

var Pool *pgxpool.Pool
var err error

func GetPool() (*pgxpool.Pool, error) {
	if Pool == nil {
		ctx := context.Background()
		config := config.Load()
		url := config.DATABASE_URL
		pool, err := pgxpool.New(ctx, url)
		if err != nil {
			log.Fatal(err)
		}
		Pool = pool

	}
	return Pool, err
}
