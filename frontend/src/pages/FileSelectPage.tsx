import { useApiUrl } from '@/main'
import { Page } from '@/util/components/Page'
import { useCheckImageLabel } from '@/util/hooks/useCheckImageLabel'
import { useFileToBase64 } from '@/util/hooks/useFileToBase64'
import { useState } from 'react'
import { FileUploadPage } from './FileUploadPage'
import { ResultPage } from './ResultPage'

export const FileSelectPage: React.FC = () => {
  const [file, setFile] = useState<File | null>()
  const [data, setData] = useState<{
    imageUrl: string
    labels: string[]
  } | null>()
  console.log(data)

  const [method, setMethod] = useState<'tumugu' | 'hodoku'>()

  const base64Image = useFileToBase64(file)

  const apiUrl = useApiUrl()

  const submit = () => {
    fetch(apiUrl + '/check-image-label', {
      method: 'POST',
      body: JSON.stringify({
        image: base64Image,
      }),
    })
      .then((res) => res.json())
      .then((result) =>
        setData({
          imageUrl: result.image_url as string,
          labels: result.labels as string[],
        })
      )
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
        back={() => {
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
      <img src="/src/assets/title01.png" style={{ margin: 'auto' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <button>
            <img src="/src/assets/rec01.png" />
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
            <img src="/src/assets/scan01.png" />
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
