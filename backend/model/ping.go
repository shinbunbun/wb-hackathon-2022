package model

type Ping struct {
	Message string `json:"message"`
}

type MemoryPostReq struct {
	ImageUrl string `json:"imageUrl"`
	Label    string `json:"label"`
}

type Empty struct{}

type MemoryGetRes struct {
	ImageUrls []string `json:"imageUrls"`
}
