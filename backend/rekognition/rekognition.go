package rekognition

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/rekognition"
)

var svc *rekognition.Rekognition

func init() {
	sess := session.Must(session.NewSession())

	svc = rekognition.New(sess, aws.NewConfig().WithRegion("ap-northeast-1"))
}

func DetectLabels(imageBytes []byte) ([]*rekognition.Label, error) {
	input := &rekognition.DetectLabelsInput{
		Image: &rekognition.Image{
			Bytes: imageBytes,
		},
		MaxLabels: aws.Int64(10),
	}

	result, err := svc.DetectLabels(input)
	if err != nil {
		return nil, err
	}

	return result.Labels, nil
}
