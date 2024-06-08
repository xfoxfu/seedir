package services

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/xfoxfu/seedir/entity"
)

var Database *gorm.DB

func DatabaseConnect() error {
	db, err := gorm.Open(postgres.Open("host=localhost user=xfoxfu dbname=seedir"), &gorm.Config{})
	if err != nil {
		return err
	}

	Database = db
	err = db.AutoMigrate(&entity.Torrent{}, &entity.File{}, &entity.Listing{})

	if err != nil {
		return err
	}
	return nil
}
