package handler

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/shirloin/react-go-prac/internal/domain"
	"github.com/shirloin/react-go-prac/internal/usecase"
	"github.com/shirloin/react-go-prac/pkg/response"
)

type IngredientHandler struct {
	ingredientUsecase usecase.IngredientUsecase
}

func NewIngredientHandler(ingredientUsecase usecase.IngredientUsecase) *IngredientHandler {
	return &IngredientHandler{ingredientUsecase: ingredientUsecase}
}

func (h *IngredientHandler) GetAll(c *fiber.Ctx) error {
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

	ingredients, pagination, err := h.ingredientUsecase.GetAll(c.Context(), limitInt, pageInt*limitInt)
	if err != nil {
		return response.Error(c, fiber.StatusInternalServerError, err.Error())
	}
	return response.Success(c, fiber.StatusOK, "Ingredients fetched successfully", ingredients, pagination)
}

func (h *IngredientHandler) Create(c *fiber.Ctx) error {
	var ingredient domain.Ingredient
	if err := c.BodyParser(&ingredient); err != nil {
		return response.Error(c, fiber.StatusBadRequest, "Invalid request body")
	}
	ingredient, err := h.ingredientUsecase.Create(c.Context(), ingredient)
	if err != nil {
		if err.Error() == "ingredient name already exists" {
			return response.Error(c, fiber.StatusConflict, err.Error())
		}
		return response.Error(c, fiber.StatusBadRequest, err.Error())
	}
	return response.Success(c, fiber.StatusCreated, "Ingredient created successfully", ingredient)
}

func (h *IngredientHandler) Update(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	if uuid == "" {
		return response.Error(c, fiber.StatusBadRequest, "Invalid UUID")
	}
	var ingredient domain.Ingredient
	if err := c.BodyParser(&ingredient); err != nil {
		return response.Error(c, fiber.StatusBadRequest, "Invalid request body")
	}
	ingredient, err := h.ingredientUsecase.Update(c.Context(), uuid, ingredient)
	if err != nil {
		if err.Error() == "ingredient name already exists" {
			return response.Error(c, fiber.StatusConflict, err.Error())
		}
		return response.Error(c, fiber.StatusBadRequest, err.Error())
	}
	return response.Success(c, fiber.StatusOK, "Ingredient updated successfully", ingredient)
}

func (h *IngredientHandler) Delete(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	if uuid == "" {
		return response.Error(c, fiber.StatusBadRequest, "Invalid UUID")
	}
	err := h.ingredientUsecase.Delete(c.Context(), uuid)
	if err != nil {
		return response.Error(c, fiber.StatusInternalServerError, err.Error())
	}
	return response.Success(c, fiber.StatusOK, "Ingredient deleted successfully", nil)
}
