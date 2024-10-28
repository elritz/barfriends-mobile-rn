import {Image} from 'react-native'
import {Asset} from 'expo-asset'
import {FontSource, loadAsync} from 'expo-font'

// function cacheImages(images) {
//   return images.map(image => {
//     if (typeof image === 'string') {
//       return Image.prefetch(image);
//     } else {
//       return Asset.fromModule(image).downloadAsync();
//     }
//   });
// }

export const cacheFonts = (fonts: (string | Record<string, FontSource>)[]) => {
  return fonts.map(font => loadAsync(font))
}

export const cacheImages = (images: string[]) => {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  })
}
