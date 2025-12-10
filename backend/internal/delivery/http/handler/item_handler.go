package handler

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/shirloin/react-go-prac/internal/domain"
	"github.com/shirloin/react-go-prac/internal/usecase"
	"github.com/shirloin/react-go-prac/pkg/response"
)

type ItemHandler struct {
	itemUsecase usecase.ItemUsecase
}

func NewItemHandler(itemUsecase usecase.ItemUsecase) *ItemHandler {
	return &ItemHandler{itemUsecase: itemUsecase}
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
