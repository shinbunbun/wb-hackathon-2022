package controller

import (
	"bytes"
	"encoding/base64"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/shinbunbun/go-gin-template/model"
	"github.com/shinbunbun/go-gin-template/rekognition"
	"github.com/shinbunbun/go-gin-template/s3"
)

func CheckImageLabelPost(c *gin.Context) {
	req := model.CheckImageLabelReq{}

	err := c.BindJSON(&req)
	if err != nil {
		c.JSON(400, err)
		return
	}

	image, err := base64.StdEncoding.DecodeString(req.Image)
	if err != nil {
		c.JSON(400, err)
		return
	}

	uuid := uuid.New().String()

	imageUrl, err := s3.Upload(bytes.NewBuffer(image), uuid+".jpeg", "image/jpeg")
	if err != nil {
		c.JSON(500, err)
		return
	}

	labels, err := rekognition.DetectLabels(image)
	if err != nil {
		c.JSON(500, err)
		return
	}

	responseLabels := []string{}
	for _, label := range labels {
		responseLabels = append(responseLabels, *label.Name)
	}

	res := model.CheckImageLabelRes{
		Labels:   responseLabels,
		ImageUrl: imageUrl,
	}
	c.JSON(200, res)
}
