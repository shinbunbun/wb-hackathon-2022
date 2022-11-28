type CheckImageLabelResponse = {
  labels: string[]
  imageUrl: string
}

export const checkImageLabel = async (
  baseUrl: string,
  base64Image: string
): Promise<CheckImageLabelResponse> => {
  const res = await fetch(baseUrl + '/check-image-label', {
    method: 'POST',
    body: JSON.stringify({
      image: base64Image,
    }),
  })
  return (await res.json()) as CheckImageLabelResponse
}
