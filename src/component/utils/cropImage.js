import { createImage } from './imageUtils' // Helper function to load an image

const getCroppedImg = async (imageSrc, pixelCrop, rotation = 0) => {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const { width, height } = pixelCrop
  canvas.width = width
  canvas.height = height

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    width,
    height,
    0,
    0,
    width,
    height,
  )

  return canvas // Return the Canvas object instead of a URL
}

export default getCroppedImg
