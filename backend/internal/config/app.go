package config

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgxpool"
	grpchandler "github.com/shirloin/react-go-prac/internal/delivery/grpc/handler"
	httphandler "github.com/shirloin/react-go-prac/internal/delivery/http/handler"
	"github.com/shirloin/react-go-prac/internal/delivery/http/route"
	"github.com/shirloin/react-go-prac/internal/repository"
	"github.com/shirloin/react-go-prac/internal/usecase"
	pb "github.com/shirloin/react-go-prac/proto/item_ingredient"
	"google.golang.org/grpc"
)

type BootstrapConfig struct {
	Pool       *pgxpool.Pool
	App        *fiber.App
	CORSConfig *CORSConfig
	GRPCServer *grpc.Server
}

func Bootstrap(bootstrapConfig *BootstrapConfig) {

	repositories := repository.InitRepositories(bootstrapConfig.Pool)
	usecases := usecase.InitUsecases(repositories)
	handlers := httphandler.InitHandlers(usecases)

	routeConfig := route.RouteConfig{
		App:      bootstrapConfig.App,
		Handlers: handlers,
	}

	bootstrapConfig.CORSConfig.SetupCORS(bootstrapConfig.App)
	routeConfig.Setup()

	// Register gRPC services
	grpcHandler := grpchandler.NewItemIngredientGRPCHandler(usecases.ItemIngredientUsecase)
	pb.RegisterItemIngredientServiceServer(bootstrapConfig.GRPCServer, grpcHandler)

}
