import {Dimensions, Image, StyleSheet, View} from 'react-native'
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'

import {products} from './Model'

const {width} = Dimensions.get('window')
const SIZE = 150
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

interface ProductsProps {
  x: SharedValue<number>
}

const Products = ({x}: ProductsProps) => (
  <View style={styles.container} pointerEvents="none">
    {products.map((product, index) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const style = useAnimatedStyle(() => {
        const translateX = interpolate(
          x.value,
          [(index - 1) * width, index * width, (index + 1) * width],
          [width / 2, 0, -width / 2],
        )
        const scale = interpolate(
          x.value,
          [(index - 1) * width, index * width, (index + 1) * width],
          [0.61, 1, 0.61],
        )
        const opacity = interpolate(
          x.value,
          [(index - 1) * width, index * width, (index + 1) * width],
          [0, 1, 0],
        )
        return {
          opacity: opacity,
          transform: [{translateX}, {scale}],
        }
      })
      return (
        <Animated.View key={index} style={[styles.container, style]}>
          {product.type === '_ad2' && (
            <Image
              accessibilityIgnoresInvertColors
              source={product.picture}
              resizeMode="contain"
              style={{width: SIZE, height: SIZE * product.aspectRatio}}
            />
          )}
        </Animated.View>
      )
    })}
  </View>
)

export default Products
