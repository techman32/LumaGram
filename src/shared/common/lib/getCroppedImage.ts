export const getCroppedImage = async (
  imageUrl: string,
  croppedAreaPixels: { width: number; height: number; x: number; y: number },
  originalFile: File,
): Promise<File | undefined> => {
  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image()
      image.src = url
      image.onload = () => resolve(image)
      image.onerror = reject
    })

  const image = await createImage(imageUrl)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) return

  canvas.width = croppedAreaPixels.width
  canvas.height = croppedAreaPixels.height

  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
  )

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return
      const croppedFile = new File([blob], originalFile.name, { type: originalFile.type })
      resolve(croppedFile)
    }, originalFile.type)
  })
}
