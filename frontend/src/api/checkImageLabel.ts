import { fileToBase64 } from '@/util/lib/fileToBase64'

type CheckImageLabelResponse = {
  labels: string[]
  imageUrl: string
}

export const checkImageLabel = async (
  baseUrl: string,
  image: File
): Promise<CheckImageLabelResponse> => {
  const res = await fetch(baseUrl + '/check-image-label', {
    method: 'POST',
    body: JSON.stringify({
      image: await fileToBase64(image),
    }),
  })
  return (await res.json()) as CheckImageLabelResponse
}
