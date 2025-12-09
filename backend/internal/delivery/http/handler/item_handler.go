package handler

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/shirloin/react-go-prac/internal/config"
	"github.com/shirloin/react-go-prac/internal/domain"
	"github.com/shirloin/react-go-prac/internal/usecase"
	pb "github.com/shirloin/react-go-prac/proto/item_ingredient"
	"github.com/shirloin/react-go-prac/pkg/response"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

type ItemHandler struct {
	itemUsecase        usecase.ItemUsecase
	grpcClient         pb.ItemIngredientServiceClient
	grpcClientConn     *grpc.ClientConn
}

func NewItemHandler(itemUsecase usecase.ItemUsecase) *ItemHandler {
	// Create gRPC client connection to call gRPC service
	cfg := config.Load()
	conn, err := grpc.NewClient("localhost"+cfg.GRPC_PORT, grpc.WithTransportCredentials(insecure.NewCredentials()))
	var grpcClient pb.ItemIngredientServiceClient
	if err == nil && conn != nil {
		grpcClient = pb.NewItemIngredientServiceClient(conn)
	}

	return &ItemHandler{
		itemUsecase:    itemUsecase,
		grpcClient:     grpcClient,
		grpcClientConn: conn,
	}
}

func (h *ItemHandler) GetAll(c *fiber.Ctx) error {
	page := c.Query("page", "0")
	pageInt, err := strconv.Atoi(page)
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "Invalid page")
	}
	limit := c.Query("limit", "10")
	limitInt, err := strconv.Atoi(limit)
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "Invalid limit")
	}

	items, pagination, err := h.itemUsecase.GetAll(c.Context(), limitInt, pageInt*limitInt)
	if err != nil {
		return response.Error(c, fiber.StatusInternalServerError, err.Error())
	}
	return response.Success(c, fiber.StatusOK, "Items fetched successfully", items, pagination)
}

func (h *ItemHandler) GetByUUID(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	if uuid == "" {
		return response.Error(c, fiber.StatusBadRequest, "Invalid UUID")
	}
	item, err := h.itemUsecase.GetByUUID(c.Context(), uuid)
	if err != nil {
		return response.Error(c, fiber.StatusNotFound, "Item not found")
	}
	return response.Success(c, fiber.StatusOK, "Item fetched successfully", item)
}

func (h *ItemHandler) Create(c *fiber.Ctx) error {
	var item domain.Item
	if err := c.BodyParser(&item); err != nil {
		return response.Error(c, fiber.StatusBadRequest, "Invalid request body")
	}
	item, err := h.itemUsecase.Create(c.Context(), item)
	if err != nil {
		if err.Error() == "item name already exists" {
			return response.Error(c, fiber.StatusConflict, err.Error())
		}
		return response.Error(c, fiber.StatusBadRequest, err.Error())
	}
	return response.Success(c, fiber.StatusCreated, "Item created successfully", item)
}

func (h *ItemHandler) Update(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	if uuid == "" {
		return response.Error(c, fiber.StatusBadRequest, "Invalid UUID")
	}
	var item domain.Item
	if err := c.BodyParser(&item); err != nil {
		return response.Error(c, fiber.StatusBadRequest, "Invalid request body")
	}
	item, err := h.itemUsecase.Update(c.Context(), uuid, item)
	if err != nil {
		if err.Error() == "item name already exists" {
			return response.Error(c, fiber.StatusConflict, err.Error())
		}
		return response.Error(c, fiber.StatusBadRequest, err.Error())
	}
	return response.Success(c, fiber.StatusOK, "Item updated successfully", item)
}

func (h *ItemHandler) Delete(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	if uuid == "" {
		return response.Error(c, fiber.StatusBadRequest, "Invalid UUID")
	}
	err := h.itemUsecase.Delete(c.Context(), uuid)
	if err != nil {
		return response.Error(c, fiber.StatusInternalServerError, err.Error())
	}
	return response.Success(c, fiber.StatusOK, "Item deleted successfully", nil)
}

func (h *ItemHandler) AddIngredient(c *fiber.Ctx) error {
	uuidItem := c.Params("uuid")
	if uuidItem == "" {
		return response.Error(c, fiber.StatusBadRequest, "Invalid item UUID")
	}

	var req struct {
		UUIDIngredient string `json:"uuid_ingredient"`
	}
	if err := c.BodyParser(&req); err != nil {
		return response.Error(c, fiber.StatusBadRequest, "Invalid request body")
	}

	// Call gRPC service instead of usecase directly
	if h.grpcClient == nil {
		return response.Error(c, fiber.StatusInternalServerError, "gRPC client not available")
	}

	grpcReq := &pb.AddItemIngredientRequest{
		UuidItem:       uuidItem,
		UuidIngredient: req.UUIDIngredient,
	}
	grpcResp, err := h.grpcClient.AddItemIngredient(c.Context(), grpcReq)
	if err != nil {
		return response.Error(c, fiber.StatusInternalServerError, err.Error())
	}
	if !grpcResp.Success {
		return response.Error(c, fiber.StatusInternalServerError, grpcResp.Message)
	}
	return response.Success(c, fiber.StatusOK, grpcResp.Message, nil)
}

func (h *ItemHandler) RemoveIngredient(c *fiber.Ctx) error {
	uuidItem := c.Params("uuid")
	uuidIngredient := c.Params("ingredient_uuid")
	if uuidItem == "" || uuidIngredient == "" {
		return response.Error(c, fiber.StatusBadRequest, "Invalid UUIDs")
	}

	// Call gRPC service instead of usecase directly
	if h.grpcClient == nil {
		return response.Error(c, fiber.StatusInternalServerError, "gRPC client not available")
	}

	grpcReq := &pb.DeleteItemIngredientRequest{
		UuidItem:       uuidItem,
		UuidIngredient: uuidIngredient,
	}
	grpcResp, err := h.grpcClient.DeleteItemIngredient(c.Context(), grpcReq)
	if err != nil {
		return response.Error(c, fiber.StatusInternalServerError, err.Error())
	}
	if !grpcResp.Success {
		return response.Error(c, fiber.StatusInternalServerError, grpcResp.Message)
	}
	return response.Success(c, fiber.StatusOK, grpcResp.Message, nil)
}
