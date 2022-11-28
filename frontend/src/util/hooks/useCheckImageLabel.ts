import { checkImageLabel } from '@/api/checkImageLabel'
import { useApiUrl } from '@/main'
import { useEffect, useState } from 'react'
import { useFileToBase64 } from './useFileToBase64'

export const useCheckImageLabel = (
  apiUrl: string,
  base64Image: string | undefined | null
): {
  data: {
    labels: string[]
    imageUrl: string
  }
  loading: boolean
} => {
  const [labels, setLabels] = useState<string[]>([])
  const [imageUrl, setImageUrl] = useState<string>('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const hoge = async (): Promise<void> => {
      if (base64Image) {
        setLoading(true)
        const res = await checkImageLabel(apiUrl, base64Image)
        console.log(res)
        setLabels(res.labels)
        setImageUrl(res.imageUrl)
        setLoading(false)
      }
    }

    hoge().catch((e): void => console.log(e))
  }, [base64Image])

  return {
    loading,
    data: {
      labels,
      imageUrl,
    },
  }
}
