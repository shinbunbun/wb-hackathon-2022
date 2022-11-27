package model

type CheckImageLabelReq struct {
	Image string `json:"image"`
}

type CheckImageLabelRes struct {
	Labels   []string `json:"labels"`
	ImageUrl string   `json:"image_url"`
}
