import React, { useEffect } from 'react'
import { Dimensions, Keyboard, UIManager, TextInput, Platform } from 'react-native'
import Animated from 'react-native-reanimated'
import { runTiming } from 'utils/animations'

const KeyboardAware: React.FC<{}> = props => {
	const isIOS = Platform.OS === 'ios'
	const show = isIOS ? 'keyboardWillShow' : 'keyboardDidShow'
	const hide = isIOS ? 'keyboardWillHide' : 'keyboardDidHide'
	const shiftValue = new Animated.Value<number>(0)
	const animationClock = new Animated.Clock()
	const paddingFromKeyboard = 10

	const translateY = runTiming({
		clock: animationClock,
		value: new Animated.Value(0),
		dest: shiftValue,
		duration: 200,
	})

	const handleShow = (event: any) => {
		const keyboardSize = event.endCoordinates.height
		const deviceSize = Dimensions.get('window').height
		const focusedField = TextInput.State.currentlyFocusedField()

		focusedField &&
			UIManager.measure(focusedField, (originX, originY, width, height, pageX, pageY) => {
				const fieldHeight = height + pageY
				const visibleScreen = deviceSize - keyboardSize - (isIOS ? 0 : 20)
				const gap = visibleScreen - fieldHeight - paddingFromKeyboard

				gap < 0 && shiftValue.setValue(gap)
			})
	}

	useEffect(() => {
		Keyboard.addListener(show, handleShow)
		Keyboard.addListener(hide, () => shiftValue.setValue(0))
		return () => {
			Keyboard.removeSubscription
			Keyboard.dismiss()
		}
	}, [])

	return <Animated.View style={{ flex: 1, transform: [{ translateY }] }}>{props.children}</Animated.View>;
}

export default KeyboardAware
