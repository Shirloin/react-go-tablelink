package route

import (
	"github.com/gofiber/fiber/v2"
	"github.com/shirloin/react-go-prac/internal/delivery/http/handler"
)

type RouteConfig struct {
	App      *fiber.App
	Handlers *handler.Handler
}

func (c *RouteConfig) Setup() {
	api := c.App.Group("/api", func(c *fiber.Ctx) error {
		return c.Next()
	})
	setUpIngredientRoutes(api.Group("/ingredients"), &c.Handlers.IngredientHandler)
}

func setUpIngredientRoutes(app fiber.Router, handler *handler.IngredientHandler) {
	app.Get("/", handler.GetAll)
	app.Post("/", handler.Create)
	app.Put("/:uuid", handler.Update)
	app.Delete("/:uuid", handler.Delete)
}
