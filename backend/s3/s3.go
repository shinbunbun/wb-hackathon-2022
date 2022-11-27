package s3

import (
	"bytes"
	"fmt"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

var Uploader *s3manager.Uploader

var S3_BUCKET_NAME string = "wb-hackathon-2022"

func init() {

	ses := session.Must(session.NewSession())

	s3vc := s3.New(ses, &aws.Config{
		Region: aws.String("ap-northeast-1"),
	})

	Uploader = s3manager.NewUploaderWithClient(s3vc)
}

func Upload(buf *bytes.Buffer, fileName string, contentType string) (string, error) {
	res, err := Uploader.Upload(&s3manager.UploadInput{
		Bucket:      aws.String(S3_BUCKET_NAME),
		Key:         aws.String(fileName),
		Body:        bytes.NewReader(buf.Bytes()),
		ContentType: aws.String(contentType),
		ACL:         aws.String("public-read"),
	})
	if err != nil {
		fmt.Printf("s3 upload error: %s\n", err.Error())
		return "", err
	}
	return res.Location, nil
}
