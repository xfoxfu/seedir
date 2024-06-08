package source

import (
	"net/url"
	"strconv"
	"strings"

	"github.com/mmcdole/gofeed"
)

type RssProvider struct {
	parser       gofeed.Parser
	siteUrl      string
	pageTemplate string
}

func CreateRssProvider(siteUrl string) (*RssProvider, error) {
	// url, err := url.Parse(urlTemplate)
	// if err != nil {
	// 	return nil, err
	// }

	parser := gofeed.NewParser()
	parser.UserAgent = "seedir (https://github.com/xfoxfu/seedir)"

	return &RssProvider{
		parser:  *parser,
		siteUrl: siteUrl,
	}, nil
}

func (rp *RssProvider) ListItem(page int) ([]Item, error) {
	feed, err := rp.parser.ParseURL(strings.ReplaceAll(rp.pageTemplate, "$page", strconv.Itoa(page)))
	if err != nil {
		return nil, err
	}

	list := []Item{}
	for _, item := range feed.Items {
		parsedLink, _ := url.Parse(item.Link)

		var torrentEnclosure *gofeed.Enclosure = nil
		for _, enclosure := range item.Enclosures {
			if enclosure.Type == "application/x-bittorrent" {
				torrentEnclosure = enclosure
			}
		}
		parsedTorrentLink, _ := url.Parse(torrentEnclosure.URL)

		list = append(list, Item{
			Title:       item.Title,
			PublishedAt: *item.PublishedParsed,
			SourceSite:  rp.siteUrl,
			SourceLink:  *parsedLink,
			TorrentLink: *parsedTorrentLink,
		})
	}
	return list, nil
}
