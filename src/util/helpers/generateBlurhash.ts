import {encode} from 'blurhash'

export const generateRandomBlurhash = () => {
  const width = 32
  const height = 32
  const pixels = new Uint8ClampedArray(width * height * 4)
  for (let i = 0; i < pixels.length; i++) {
    pixels[i] = Math.floor(Math.random() * 256)
  }
  return encode(pixels, width, height, 4, 4)
}
