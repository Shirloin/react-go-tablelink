package handler

import (
	"context"

	"github.com/shirloin/react-go-prac/internal/usecase"
	pb "github.com/shirloin/react-go-prac/proto/item_ingredient"
)

type ItemIngredientGRPCHandler struct {
	pb.UnimplementedItemIngredientServiceServer
	itemIngredientUsecase usecase.ItemIngredientUsecase
}

func NewItemIngredientGRPCHandler(itemIngredientUsecase usecase.ItemIngredientUsecase) *ItemIngredientGRPCHandler {
	return &ItemIngredientGRPCHandler{
		itemIngredientUsecase: itemIngredientUsecase,
	}
}

func (h *ItemIngredientGRPCHandler) AddItemIngredient(ctx context.Context, req *pb.AddItemIngredientRequest) (*pb.AddItemIngredientResponse, error) {
	err := h.itemIngredientUsecase.Add(ctx, req.UuidItem, req.UuidIngredient)
	if err != nil {
		return &pb.AddItemIngredientResponse{
			Success: false,
			Message: err.Error(),
		}, nil
	}
	return &pb.AddItemIngredientResponse{
		Success: true,
		Message: "Item ingredient added successfully",
	}, nil
}

func (h *ItemIngredientGRPCHandler) DeleteItemIngredient(ctx context.Context, req *pb.DeleteItemIngredientRequest) (*pb.DeleteItemIngredientResponse, error) {
	err := h.itemIngredientUsecase.Delete(ctx, req.UuidItem, req.UuidIngredient)
	if err != nil {
		return &pb.DeleteItemIngredientResponse{
			Success: false,
			Message: err.Error(),
		}, nil
	}
	return &pb.DeleteItemIngredientResponse{
		Success: true,
		Message: "Item ingredient deleted successfully",
	}, nil
}

func (h *ItemIngredientGRPCHandler) GetItemIngredients(ctx context.Context, req *pb.GetItemIngredientsRequest) (*pb.GetItemIngredientsResponse, error) {
	itemIngredients, err := h.itemIngredientUsecase.GetByItemUUID(ctx, req.UuidItem)
	if err != nil {
		return &pb.GetItemIngredientsResponse{
			Success: false,
			Message: err.Error(),
		}, nil
	}

	pbItemIngredients := make([]*pb.ItemIngredient, 0, len(itemIngredients))
	for _, itemIngredient := range itemIngredients {
		pbItemIngredients = append(pbItemIngredients, &pb.ItemIngredient{
			UuidItem:       itemIngredient.UUIDItem.String(),
			UuidIngredient: itemIngredient.UUIDIngredient.String(),
		})
	}

	return &pb.GetItemIngredientsResponse{
		Success:         true,
		Message:         "Item ingredients fetched successfully",
		ItemIngredients: pbItemIngredients,
	}, nil
}
