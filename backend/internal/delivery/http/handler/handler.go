package handler

import (
	"github.com/shirloin/react-go-prac/internal/usecase"
)

type Handler struct {
	IngredientHandler IngredientHandler
	ItemHandler       ItemHandler
}

func InitHandlers(usecases *usecase.Usecases) *Handler {
	return &Handler{
		IngredientHandler: *NewIngredientHandler(usecases.IngredientUsecase),
		ItemHandler:       *NewItemHandler(usecases.ItemUsecase),
	}
}
