import { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { checkImageLabel } from './api/checkImageLabel'
import { fileToBase64 } from './util/lib/fileToBase64'

export enum routes {}

const RoutePage: React.FC = () => {
  const [file, setFile] = useState<File>()
  const [text, setText] = useState<string>()
  const [labels, setLabels] = useState<string[]>([])
  const [imageUrl, setImageUrl] = useState<string>('')

  useEffect(() => {
    const hoge = async (): Promise<void> => {
      setText(file ? await fileToBase64(file) : 'ファイルをアップロードしてね')
      if (file) {
        const res = await checkImageLabel('http://localhost:8080', file)
        setLabels(res.labels)
        setImageUrl(res.imageUrl)
      }
    }

    hoge().catch((e): void => console.log(e))
  }, [file])

  return (
    <div>
      <div>{text}</div>
      <input
        type="file"
        multiple={false}
        onChange={(e): void => {
          setFile(e.target.files ? e.target.files[0] : undefined)
        }}
      />
      <h1>結果</h1>
      <h2>labels</h2>
      <ul>
        {labels.map((label) => (
          <li>{label}</li>
        ))}
      </ul>
      <h2>image</h2>
      <img src={imageUrl} />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RoutePage />,
  },
])

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />
}
