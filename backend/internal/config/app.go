package config

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgxpool"
	grpchandler "github.com/shirloin/react-go-prac/internal/delivery/grpc/handler"
	"github.com/shirloin/react-go-prac/internal/delivery/http/handler"
	"github.com/shirloin/react-go-prac/internal/delivery/http/route"
	"github.com/shirloin/react-go-prac/internal/repository"
	"github.com/shirloin/react-go-prac/internal/usecase"
	item_ingredient_pb "github.com/shirloin/react-go-prac/proto/item_ingredient"
	"google.golang.org/grpc"
)

type BootstrapConfig struct {
	Pool        *pgxpool.Pool
	App         *fiber.App
	CORSConfig  *CORSConfig
	GRPCServer  *grpc.Server
	GRPCHandler *grpchandler.GRPCHandler
}

func Bootstrap(bootstrapConfig *BootstrapConfig) {

	repositories := repository.InitRepositories(bootstrapConfig.Pool)
	usecases := usecase.InitUsecases(repositories)

	grpcHandlers := grpchandler.InitGRPCHandler(usecases)
	handlers := handler.InitHandlers(usecases)

	routeConfig := route.RouteConfig{
		App:      bootstrapConfig.App,
		Handlers: handlers,
	}

	bootstrapConfig.CORSConfig.SetupCORS(bootstrapConfig.App)
	routeConfig.Setup()

	// Register gRPC services
	item_ingredient_pb.RegisterItemIngredientServiceServer(bootstrapConfig.GRPCServer, grpcHandlers.ItemIngredientGRPCHandler)

}
