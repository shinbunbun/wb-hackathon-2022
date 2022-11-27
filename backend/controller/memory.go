package controller

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/shinbunbun/go-gin-template/model"
)

var MemoryMap = make(map[string][]string)

func MemoryPost(c *gin.Context) {
	req := model.MemoryPostReq{}

	err := c.BindJSON(&req)
	if err != nil {
		c.JSON(400, err)
		return
	}

	MemoryMap[req.Label] = append(MemoryMap[req.Label], req.ImageUrl)

	fmt.Printf("MemoryMap: %v\n", MemoryMap)

	res := model.Empty{}
	c.JSON(200, res)
}

func MemoryGet(c *gin.Context) {
	label := c.Param("label")

	res := model.MemoryGetRes{
		ImageUrls: MemoryMap[label],
	}

	c.JSON(200, res)
}
