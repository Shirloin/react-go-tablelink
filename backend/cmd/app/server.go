package main

import (
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/gofiber/fiber/v2"
	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"github.com/shirloin/react-go-prac/internal/config"
	"github.com/shirloin/react-go-prac/internal/database"
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

	wrappedGrpc := grpcweb.WrapServer(grpcServer,
		grpcweb.WithOriginFunc(func(origin string) bool {
			return true
		}),
	)

	go startHTTPServer(cfg.PORT, app)
	go startGRPCServer(cfg.GRPC_PORT, wrappedGrpc)

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
}

func startHTTPServer(port string, app *fiber.App) {
	log.Printf("HTTP Server is running on port %s", port)
	if err := app.Listen(port); err != nil {
		log.Fatalf("Error starting HTTP server: %v", err)
	}
}

func startGRPCServer(port string, wrappedGrpc *grpcweb.WrappedGrpcServer) {
	server := &http.Server{
		Addr:    port,
		Handler: wrappedGrpc,
	}

	log.Printf("gRPC-Web server running on %s", port)
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("gRPC-Web server error: %v", err)
	}
}
