package config

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/shirloin/react-go-prac/internal/delivery/http/handler"
	"github.com/shirloin/react-go-prac/internal/delivery/http/route"
	"github.com/shirloin/react-go-prac/internal/repository"
	"github.com/shirloin/react-go-prac/internal/usecase"
)

type BootstrapConfig struct {
	Pool       *pgxpool.Pool
	App        *fiber.App
	CORSConfig *CORSConfig
}

func Bootstrap(config *BootstrapConfig) {

	repositories := repository.InitRepositories(config.Pool)
	usecases := usecase.InitUsecases(repositories)
	handlers := handler.InitHandlers(usecases)

	routeConfig := route.RouteConfig{
		App:      config.App,
		Handlers: handlers,
	}

	config.CORSConfig.SetupCORS(config.App)
	routeConfig.Setup()

}
