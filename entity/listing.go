package entity

import (
	"net/url"
	"time"
)

type Listing struct {
	ModelBase
	TorrentId   uint
	Title       string
	PublishedAt time.Time
	SourceSite  string
	SourceLink  url.URL `gorm:"type:text"`
	TorrentLink url.URL `gorm:"type:text"`
}
