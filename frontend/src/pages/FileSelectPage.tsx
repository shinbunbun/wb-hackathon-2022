import { useApiUrl } from '@/main'
import { Page } from '@/util/components/Page'
import { useFileToBase64 } from '@/util/hooks/useFileToBase64'
import { useEffect, useState } from 'react'
import { FileUploadPage } from './FileUploadPage'
import { ResultPage } from './ResultPage'
import rec from '../assets/rec01.png'
import scan from '../assets/scan01.png'
import title from '../assets/title01.png'
import { Start } from './Start'

export const FileSelectPage: React.FC = () => {
  const [start, setStart] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setStart(false)
    }, 3000)
  }, [])
  const [file, setFile] = useState<File | null>()
  const [data, setData] = useState<{
    imageUrl: string
    labels: string[]
  } | null>()
  console.log(data)

  const [method, setMethod] = useState<'tumugu' | 'hodoku'>()

  const base64Image = useFileToBase64(file)

  const apiUrl = useApiUrl()

  const submit = (): void => {
    fetch(apiUrl + '/check-image-label', {
      method: 'POST',
      body: JSON.stringify({
        image: base64Image,
      }),
    })
      .then(
        (res): Promise<{ image_url: string; labels: string[] }> =>
          res.json() as Promise<{ image_url: string; labels: string[] }>
      )
      .then((result): void =>
        setData({
          imageUrl: result.image_url,
          labels: result.labels,
        })
      )
      .catch((e) => console.log(e))
  }

  if (start) {
    return <Start />
  }

  if (data && method === 'tumugu') {
    setFile(null)
    setData(null)
  }

  if (data && method === 'hodoku') {
    return (
      <ResultPage
        labels={data.labels}
        imageUrl={data.imageUrl}
        back={(): void => {
          setFile(null)
          setData(null)
        }}
      />
    )
  }

  if (file) {
    return <FileUploadPage image={file} submit={submit} />
  }

  return (
    <Page>
      <img src={title} style={{ margin: 'auto' }} alt="title" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <button>
            <img src={rec} alt="rec" />
          </button>
          <input
            type="file"
            multiple={false}
            accept="image/*"
            capture="user"
            onChange={(e): void => {
              setMethod('tumugu')
              setFile(e.target.files && e.target.files[0])
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <button>
            <img src={scan} alt="scan" />
          </button>
          <input
            type="file"
            multiple={false}
            accept="image/*"
            capture="environment"
            onChange={(e): void => {
              setMethod('hodoku')
              setFile(e.target.files && e.target.files[0])
            }}
          />
        </div>
      </div>
    </Page>
  )
}
