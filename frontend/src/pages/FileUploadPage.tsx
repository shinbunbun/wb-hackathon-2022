import { Page } from '@/util/components/Page'

export const FileUploadPage: React.FC<{
  image: File
  submit: () => void
}> = ({ image, submit }) => {
  const imageUrl = URL.createObjectURL(image)
  return (
    <Page>
      <img
        style={{ width: '300px', height: '300px', objectFit: 'cover' }}
        src={imageUrl}
        alt="preview"
      />
      <button type="button" onClick={submit}>
        アップロードする
      </button>
    </Page>
  )
}
