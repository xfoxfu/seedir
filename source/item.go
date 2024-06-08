package source

import (
	"net/url"
	"time"
)

type Item struct {
	Title       string
	InfoHash    string
	PublishedAt time.Time
	SourceSite  string
	SourceLink  url.URL
	TorrentLink url.URL
}

func (item *Item) GetTorrent() error {
	return nil
}
