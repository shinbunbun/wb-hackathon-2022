import { useEffect, useState } from 'react'

export const useFileToBase64 = (
  file: File | undefined | null
): string | undefined => {
  const [base64, setBase64] = useState<string>()

  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        if (typeof reader.result === 'string') {
          setBase64(reader.result.slice(`data:${file.type};base64,`.length))
        }
      })
      reader.readAsDataURL(file)
    }
  }, [file])

  return base64
}
