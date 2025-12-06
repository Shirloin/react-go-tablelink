package main

import (
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/gofiber/fiber/v2"
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

	bootstrapConfig := config.BootstrapConfig{
		Pool:       pool,
		App:        app,
		CORSConfig: corsConfig,
	}

	config.Bootstrap(&bootstrapConfig)

	go startHTTPServer(cfg.PORT, app)

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")
	if err := app.Shutdown(); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}
}

func startHTTPServer(port string, app *fiber.App) {
	log.Printf("Server is running on port %s", port)
	if err := app.Listen(port); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
