import {Image} from 'react-native'
import {Dimensions, View} from 'react-native'

import {Box} from '#/src/components/ui/box'
import {Button, ButtonText} from '#/src/components/ui/button'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'
// TODO: UX(Complete this card for venues etc....)
import {Product} from './Model'

const {width} = Dimensions.get('window')
export const CARD_HEIGHT = (width * 1564) / 1600

interface CardProps {
  product: Product
}

const Card = ({product}: CardProps) => {
  switch (product.type) {
    case '_ad1':
      return (
        <Box
          accessibilityIgnoresInvertColors
          className={` w-${width} h-${CARD_HEIGHT} bg-transparent`}>
          <VStack
            style={{
              borderRadius: 16,
              margin: 19,
              flex: 1,
              backgroundColor: product.color1,
              padding: 16,
              justifyContent: 'space-between',
            }}>
            <VStack>
              <Heading
                allowFontScaling
                adjustsFontSizeToFit
                className="leading-60 text-left text-6xl font-extrabold uppercase">
                {product.title}
              </Heading>
              <Text className="text-xl font-bold">{product.subtitle}</Text>
            </VStack>
            <HStack>
              <Button
                onPress={() => console.log('route', product.route)}
                className="w-auto self-center rounded-full ">
                <ButtonText className="px-2">{product.buttoncta}</ButtonText>
              </Button>
            </HStack>
          </VStack>
        </Box>
      )
    case '_ad2':
      return (
        <Box
          accessibilityIgnoresInvertColors
          className={` w-${width} h-${CARD_HEIGHT} bg-transparent`}>
          <View
            style={{
              borderRadius: 16,
              margin: 19,
              flex: 1,
              backgroundColor: product.color1,
              padding: 16,
              justifyContent: 'space-between',
            }}>
            <View>
              <Heading className="text-2xl">{product.title}</Heading>
              <Text className="">{product.subtitle}</Text>
            </View>
            <Button
              onPress={() => console.log('route', product.route)}
              className="w-auto self-center rounded-full ">
              <ButtonText className="px-2">{product.buttoncta}</ButtonText>
            </Button>
          </View>
        </Box>
      )
    case '_ad3':
      return (
        <Box
          accessibilityIgnoresInvertColors
          className={` w-${width} h-${CARD_HEIGHT} bg-transparent`}>
          <VStack
            style={{
              borderRadius: 16,
              margin: 19,
              flex: 1,
              backgroundColor: product.color1,
              padding: 16,
              justifyContent: 'space-between',
            }}>
            <VStack>
              <Heading
                allowFontScaling
                adjustsFontSizeToFit
                className="leading-60 text-left text-6xl font-extrabold uppercase">
                {product.title}
              </Heading>
              <Text className="text-xl font-bold">{product.subtitle}</Text>
            </VStack>
            <HStack>
              <Button
                onPress={() => console.log('route', product.route)}
                className="w-auto self-center rounded-full ">
                <ButtonText className="px-2">{product.buttoncta}</ButtonText>
              </Button>
            </HStack>
          </VStack>
        </Box>
      )
    case '_ad4':
      return (
        <Box
          accessibilityIgnoresInvertColors
          className={` w-${width} h-${CARD_HEIGHT} relative bg-transparent`}>
          <VStack
            style={{
              position: 'relative',
              borderRadius: 16,
              margin: 19,
              flex: 1,
              backgroundColor: product.color1,
              justifyContent: 'space-between',
              overflow: 'hidden',
            }}>
            <Image
              source={product.cover}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
            <HStack className="absolute bottom-0 left-0 right-[0px] justify-around py-3">
              <Button
                onPress={() => console.log('route', product.route)}
                className="z-10 w-auto self-center rounded-full ">
                <ButtonText className="px-2">{product.buttoncta}</ButtonText>
              </Button>
            </HStack>
          </VStack>
        </Box>
      )
    case '_ad5':
      return (
        <Box
          accessibilityIgnoresInvertColors
          className={` w-${width} h-${CARD_HEIGHT} relative bg-transparent`}>
          <VStack
            style={{
              position: 'relative',
              borderRadius: 16,
              margin: 19,
              flex: 1,
              backgroundColor: product.color1,
              justifyContent: 'space-between',
              alignItems: 'center',
              overflow: 'hidden',
            }}
            className="p-3">
            <Image
              source={product.logo}
              resizeMode="contain"
              style={{width: 150, height: 150, borderRadius: 15}}
            />
            <Heading
              // lineHeight={'$6xl'}
              allowFontScaling
              adjustsFontSizeToFit
              className="text-center text-2xl font-extrabold uppercase">
              {product.title}
            </Heading>
            <Text className="text-lg">{product.subtitle}</Text>
            <HStack className="justify-around py-3">
              <Button
                onPress={() => console.log('route', product.route)}
                className="z-10 w-auto self-center rounded-full ">
                <ButtonText className="px-2">{product.buttoncta}</ButtonText>
              </Button>
            </HStack>
          </VStack>
        </Box>
      )
  }
}

export default Card
