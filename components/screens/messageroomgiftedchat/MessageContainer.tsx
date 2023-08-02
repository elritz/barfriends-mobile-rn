/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { View, Text } from 'react-native'
import { Avatar, Bubble, SystemMessage, Message, MessageText } from 'react-native-gifted-chat'

export const renderAvatar = props => (
	<Avatar
		{...props}
		containerStyle={{ left: {}, right: {} }}
		imageStyle={{ left: { height: 30, width: 30 }, right: {} }}
	/>
)

export const renderBubble = props => (
	<Bubble
		{...props}
		// renderTime={() => <Text>Time</Text>}
		// renderTicks={() => <Text>Ticks</Text>}
		containerStyle={{
			left: {},
			right: {},
		}}
		textStyle={{
			left: { fontSize: 10 },
			right: { fontSize: 10 },
		}}
		wrapperStyle={{
			left: {},
			right: {},
		}}
		bottomContainerStyle={{
			left: {},
			right: {},
		}}
		tickStyle={{}}
		usernameStyle={{ fontWeight: '100' }}
		containerToNextStyle={{
			left: {},
			right: {},
		}}
		containerToPreviousStyle={{
			left: {},
			right: {},
		}}
	/>
)

export const renderSystemMessage = props => (
	<SystemMessage
		{...props}
		containerStyle={{}}
		wrapperStyle={{ borderWidth: 10 }}
		textStyle={{ fontWeight: '900' }}
	/>
)

export const renderMessage = props => (
	<Message
		{...props}
		// renderDay={() => <Text>Date</Text>}
		containerStyle={{
			left: {},
			right: {},
		}}
	/>
)

export const renderMessageText = props => {
	const FONT_SIZE = 17
	return (
		<MessageText
			{...props}
			textStyle={{ left: { fontSize: FONT_SIZE }, right: { fontSize: FONT_SIZE } }}
			containerStyle={{
				left: {},
				right: {},
			}}
			linkStyle={{
				left: { color: 'orange' },
				right: { color: 'orange' },
			}}
		/>
	)
}

export const renderCustomView = ({ user }) => (
	<View style={{ minHeight: 20, alignItems: 'center' }}>
		<Text>
			Current user:
			{user.name}
		</Text>
		<Text>From CustomView</Text>
	</View>
)
