import { Pressable } from '@gluestack-ui/themed'
import { useRouter } from 'expo-router'
import * as React from 'react'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

interface ButtonProps {
	children: React.ReactNode
	height: number
	width?: number
}

const GoBack: React.FC<ButtonProps> = (props: ButtonProps) => {
	const router = useRouter()

	GoBack.defaultProps = {
		width: 40,
		height: wp(15),
	}

	const handleOnPress = () => {
		if (router.canGoBack()) {
			router.back()
		} else {
			router.push({
				pathname: '/(app)/hometab/venuefeed',
			})
		}
		// router.setParams({
		// 	searchtext: '',
		// })
	}

	const { width, height, children } = props

	return (
		<Pressable
			style={{
				flex: 1,
				maxWidth: width,
				height,
				alignItems: 'center',
				justifyContent: 'center',
			}}
			onPress={() => handleOnPress()}
		>
			{children}
		</Pressable>
	)
}

export default GoBack
