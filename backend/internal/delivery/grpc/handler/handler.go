package handler

import "github.com/shirloin/react-go-prac/internal/usecase"

type GRPCHandler struct {
	ItemIngredientGRPCHandler *ItemIngredientGRPCHandler
}

func InitGRPCHandler(usecases *usecase.Usecases) *GRPCHandler {
	return &GRPCHandler{
		ItemIngredientGRPCHandler: NewItemIngredientGRPCHandler(usecases.ItemIngredientUsecase)}
}
