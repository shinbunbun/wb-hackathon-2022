import { useApiUrl } from '@/main'
import { Page } from '@/util/components/Page'
import { useEffect, useState } from 'react'
import { gallery, galleryItem } from './ResultPage.css'
import { ReactComponent as LeftArrow } from '@/assets/arrow_left.svg'

export const ResultPage: React.FC<{
  imageUrl: string
  labels: string[]
  back: () => void
}> = ({ labels, imageUrl, back }) => {
  const [imageUrls, setImageUrls] = useState<string[]>([])

  const apiUrl = useApiUrl()

  useEffect(() => {
    const fetcher = async (): Promise<void> => {
      const targetLabel = labels[Math.floor(Math.random() * labels.length)]
      await fetch(apiUrl + '/memory', {
        method: 'POST',
        body: JSON.stringify({
          imageUrl: imageUrl,
          label: targetLabel,
        }),
      })
      const res = await fetch(apiUrl + '/memory/' + targetLabel, {
        method: 'GET',
      })
      const result = (await res.json()) as {
        imageUrls: string[]
      }

      setImageUrls(result.imageUrls)
    }

    fetcher().catch((e) => console.log(e))
  }, [labels, apiUrl, imageUrl])

  return (
    <Page>
      <button onClick={back}>
        <LeftArrow />
      </button>
      <div className={gallery}>
        {imageUrls.map((imageUrl, i) => {
          return (
            <img className={galleryItem} src={imageUrl} alt="preview" key={i} />
          )
        })}
      </div>
    </Page>
  )
}
