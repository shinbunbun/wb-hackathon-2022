export const addLabel = (
  baseUrl: string,
  imageUrl: string,
  label: string
): Promise<Response> => {
  return fetch(baseUrl + '/memory', {
    method: 'POST',
    body: JSON.stringify({
      imageUrl,
      label,
    }),
  })
}

type MemoriesFormLabelResponse = {
  imageUrls: string[]
}

export const memoriesFromLabel = async (
  baseUrl: string,
  label: string
): Promise<MemoriesFormLabelResponse> => {
  const res = await fetch(baseUrl + '/memory/' + label, {
    method: 'GET',
  })
  return (await res.json()) as MemoriesFormLabelResponse
}
