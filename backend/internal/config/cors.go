package config

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type CORSConfig struct {
	AllowedOrigins []string
	AllowedMethods []string
	AllowedHeaders []string
}

func NewCORSConfig() *CORSConfig {
	return &CORSConfig{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type", "Authorization"},
	}
}

func (c *CORSConfig) SetupCORS(app *fiber.App) {
	origin := "*"
	if len(c.AllowedOrigins) > 0 {
		origin = c.AllowedOrigins[0]
	}

	// Cannot use AllowCredentials: true with wildcard origin "*"
	// CORS specification requires specific origins when credentials are enabled
	allowCredentials := origin != "*"

	app.Use(cors.New(cors.Config{
		AllowOrigins:     origin,
		AllowMethods:     strings.Join(c.AllowedMethods, ","),
		AllowHeaders:     strings.Join(c.AllowedHeaders, ","),
		AllowCredentials: allowCredentials,
	}))
}
