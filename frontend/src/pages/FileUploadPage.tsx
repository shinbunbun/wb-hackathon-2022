export const FileUploadPage: React.FC<{
  image: File
  submit: () => void
}> = ({ image, submit }) => {
  const imageUrl = URL.createObjectURL(image)
  return (
    <div>
      <img src={imageUrl} alt="preview" />
      <button type="button" onClick={submit}>
        アップロードする
      </button>
    </div>
  )
}
