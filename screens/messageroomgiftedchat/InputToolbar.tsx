/* eslint-disable react/destructuring-assignment */

/* eslint-disable react/jsx-props-no-spreading */
import { Ionicons } from '@expo/vector-icons'
import { Icon, useColorMode, Image } from 'native-base'
import React from 'react'
import { InputToolbar, Actions, Composer, Send } from 'react-native-gifted-chat'

// !! TODO: DEL(This no longer applies because it is not installed DELETE)

export const renderInputToolbar = props => (
	<InputToolbar
		{...props}
		containerStyle={{
			// backgroundColor: '#222B45',
			paddingVertical: 10,
		}}
		primaryStyle={{ alignItems: 'center' }}
	/>
)

export const renderActions = props => (
	<Actions
		{...props}
		containerStyle={{
			width: 44,
			height: 44,
			alignItems: 'center',
			justifyContent: 'center',
			marginLeft: 4,
			marginRight: 4,
			marginBottom: 0,
		}}
		icon={() => (
			<Image
				source={{
					uri: 'https://placeimg.com/32/32/any',
				}}
				style={{ width: 32, height: 32 }}
				alt={'Profile Photo'}
			/>
		)}
		options={{
			'Choose From Library': () => {
				console.log('TODO: Choose From Library')
			},
			Cancel: () => {
				console.log('TODO: Cancel')
			},
		}}
		// optionTintColor='#222B45'
	/>
)

export const renderComposer = props => (
	<Composer
		{...props}
		textInputStyle={{
			backgroundColor: '#EDF1F7',
			borderWidth: 1,
			borderRadius: 5,
			borderColor: '#E4E9F2',
			paddingTop: 8.5,
			paddingHorizontal: 12,
			marginLeft: 0,
		}}
	/>
)

export const renderSend = props => {
	const _nbMode = useColorMode()
	return (
		<Send
			{...props}
			disabled={!props.text}
			containerStyle={{
				width: 44,
				height: 44,
				alignItems: 'center',
				justifyContent: 'center',
				marginHorizontal: 4,
			}}
		>
			<Icon
				size={'lg'}
				color={_nbMode.colorMode === 'light' ? 'dark.100' : 'light.100'}
				mx={2}
				as={Ionicons}
				name={'md-send'}
			/>
		</Send>
	)
}