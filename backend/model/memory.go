package model

type MemoryPostReq struct {
	ImageUrl string `json:"imageUrl"`
	Label    string `json:"label"`
}

type MemoryGetRes struct {
	ImageUrls []string `json:"imageUrls"`
}
