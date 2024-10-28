const cloudName = 'yourCloud'
const uploadPreset = 'yourPreset'
const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`

interface UploadParams {
  image: {base64: string}
  setProgress: (progress: number) => void
  setCloudinaryId: (id: string) => void
}

export const cloudinaryUpload = async ({
  image,
  setProgress,
  setCloudinaryId,
}: UploadParams) => {
  const xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

  // Update progress (can be used to show progress indicator)
  xhr.upload.addEventListener('progress', e => {
    const progress = Math.round((e.loaded * 100.0) / e.total)
    setProgress(progress)
  })

  // handle successful upload
  xhr.onreadystatechange = e => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText)
      setProgress(100)
      setCloudinaryId(response.public_id)
    }
  }

  xhr.addEventListener('error', e => console.error(e))

  const fd = new FormData()
  const data = `data:;base64,${image.base64}` // the critical step!
  fd.append('file', data)
  fd.append('upload_preset', uploadPreset)
  fd.append('tags', 'your tags')
  setProgress(0)
  xhr.send(fd)
}
