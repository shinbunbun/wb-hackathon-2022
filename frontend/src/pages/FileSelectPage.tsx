import { useApiUrl } from '@/main'
import { useCheckImageLabel } from '@/util/hooks/useCheckImageLabel'
import { useFileToBase64 } from '@/util/hooks/useFileToBase64'
import { useState } from 'react'

export const FileSelectPage: React.FC = () => {
  const [file, setFile] = useState<File | null>()

  const base64Image = useFileToBase64(file)

  const { data } = useCheckImageLabel(useApiUrl(), base64Image)

  return (
    <div>
      <input
        type="file"
        multiple={false}
        accept="image/*"
        capture="user"
        onChange={(e): void => setFile(e.target.files && e.target.files[0])}
      />
      <input
        type="file"
        multiple={false}
        accept="image/*"
        capture="environment"
        onChange={(e): void => setFile(e.target.files && e.target.files[0])}
      />
      <h1>結果</h1>
      <h2>labels</h2>
      <ul>
        {data.labels.map((label, i) => (
          <li key={i}>{label}</li>
        ))}
      </ul>
      <h2>image</h2>
      <img src={data.imageUrl} />
    </div>
  )
}
