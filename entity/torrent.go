package entity

type Torrent struct {
	ModelBase
	Title    string
	InfoHash string

	Files    []File
	Listings []Listing
}
