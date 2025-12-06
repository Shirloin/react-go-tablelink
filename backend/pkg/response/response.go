package response

import (
	"github.com/gofiber/fiber/v2"
)

type Response struct {
	Status     bool        `json:"status"`
	Message    string      `json:"message"`
	Data       interface{} `json:"data"`
	Pagination interface{} `json:"pagination,omitempty"`
}

// Success accepts optional pagination as variadic parameter
func Success(f *fiber.Ctx, code int, message string, data interface{}, pagination ...interface{}) error {
	resp := Response{
		Status:  true,
		Message: message,
		Data:    data,
	}

	if len(pagination) > 0 && pagination[0] != nil {
		resp.Pagination = pagination[0]
	}

	return f.Status(code).JSON(resp)
}

func Error(f *fiber.Ctx, code int, message string) error {
	return f.Status(code).JSON(Response{
		Status:  false,
		Message: message,
	})
}
