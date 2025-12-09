package main

import (
	"log"
	"net"
	"os"
	"os/signal"
	"syscall"

	"github.com/gofiber/fiber/v2"
	"github.com/shirloin/react-go-prac/internal/config"
	"github.com/shirloin/react-go-prac/internal/database"
	"google.golang.org/grpc"
)

func main() {
	cfg := config.Load()
	app := config.NewFiber()
	corsConfig := config.NewCORSConfig()
	pool, err := database.GetPool()
	if err != nil {
		log.Fatalf("Error getting database instance: %v", err)
		panic(err)
	}

	grpcServer := config.NewGRPCServer()

	bootstrapConfig := config.BootstrapConfig{
		Pool:       pool,
		App:        app,
		CORSConfig: corsConfig,
		GRPCServer: grpcServer,
	}

	config.Bootstrap(&bootstrapConfig)

	go startHTTPServer(cfg.PORT, app)
	go startGRPCServer(cfg.GRPC_PORT, grpcServer)

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")
	grpcServer.GracefulStop()
	if err := app.Shutdown(); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}
}

func startHTTPServer(port string, app *fiber.App) {
	log.Printf("HTTP Server is running on port %s", port)
	if err := app.Listen(port); err != nil {
		log.Fatalf("Error starting HTTP server: %v", err)
	}
}

func startGRPCServer(port string, grpcServer *grpc.Server) {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("Failed to listen on %s: %v", port, err)
	}
	log.Printf("gRPC Server is running on port %s", port)
	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("Failed to serve gRPC server: %v", err)
	}
}
