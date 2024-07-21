import Card, { CARD_HEIGHT } from './Card'
import { products } from './Model'
import Products from './Products'
import { Dimensions, View, StyleSheet } from 'react-native'
import Animated, {
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
	interpolateColor,
} from 'react-native-reanimated'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
	slider: { height: CARD_HEIGHT },
})
const snapToOffsets = [0, CARD_HEIGHT]

const AdvertismentHorizontal = () => {
	const translateX = useSharedValue(0)
	const onScroll = useAnimatedScrollHandler({
		onScroll: event => {
			translateX.value = event.contentOffset.x
		},
	})

	const style = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(
			translateX.value,
			products.map((_, i) => width * i),
			products.map(product => product.color2),
		) as string
		return { flex: 1, backgroundColor }
	})

	return (
        <Animated.View style={[style, { paddingTop: 0 }]}>
            {/* <ScrollView
				contentContainerStyle={{ paddingTop: 110 }}
				bounces={false}
				showsVerticalScrollIndicator={false}
				snapToOffsets={snapToOffsets}
				snapToEnd={false}
				decelerationRate='fast'
			> */}
            <View style={styles.slider}>
				<Animated.ScrollView
					onScroll={onScroll}
					scrollEventThrottle={16}
					decelerationRate='fast'
					snapToInterval={width}
					horizontal
					showsHorizontalScrollIndicator={false}
				>
					{products.map((product, index) => (
						<Card product={product} key={index} />
					))}
				</Animated.ScrollView>
				<Products x={translateX} />
			</View>
            {/* </ScrollView> */}
        </Animated.View>
    );
}

export default AdvertismentHorizontal
