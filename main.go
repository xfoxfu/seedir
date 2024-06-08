package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	services "github.com/xfoxfu/seedir/service"
)

func main() {
	services.DatabaseConnect()

	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	log.Fatal(app.Listen(":3000"))
}
