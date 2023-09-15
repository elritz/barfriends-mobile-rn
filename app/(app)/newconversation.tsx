import { useReactiveVar } from '@apollo/client'
import { AddIcon, Button, Text, Input, Pressable, HStack, VStack } from '@components/core'
import ContactItem from '@components/screens/conversations/ContactItem'
import { ThemeReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import useContentInsets from '@util/hooks/useContentInsets'
import { filter } from 'lodash'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

const contactslist = [
	{ key: '1', value: 'Mobiles', disabled: true },
	{ key: '2', value: 'Appliances' },
	{ key: '3', value: 'Cameras' },
	{ key: '4', value: 'Computers', disabled: true },
	{ key: '5', value: 'Vegetables' },
	{ key: '6', value: 'Diary Products' },
	{ key: '7', value: 'Drinks' },
	{ key: '5', value: 'Vegetables' },
	{ key: '126', value: 'Diary Products' },
	{ key: '12w7', value: 'Drinks' },
	{ key: '125', value: 'Vegetables' },
	{ key: '12w6', value: 'Diary Products' },
	{ key: '12w7', value: 'Drinks' },
	{ key: '12e5', value: 'Vegetables' },
	{ key: '12w6', value: 'Diary Products' },
	{ key: '127', value: 'Drinks' },
	{ key: '12w5', value: 'Vegetables' },
	{ key: '12w6', value: 'Diary Products' },
	{ key: '12w7', value: 'Drinks' },
]

export default function NewConversation() {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const insets = useContentInsets()
	const [selected, setSelected] = useState([])
	const [contacts, setContacts] = useState(
		contactslist.sort((a, b) => {
			const nameA = a.value.toLowerCase()
			const nameB = b.value.toLowerCase()

			if (nameA < nameB) return -1
			if (nameA > nameB) return 1
			return 0
		}),
	)

	const { control, setValue, handleSubmit, watch } = useForm({
		defaultValues: {
			selected: selected,
			searchtext: '',
		},
		mode: 'onChange',
		reValidateMode: 'onChange',
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	type onPressProps = {
		listType: 'contacts' | 'selected'
		item: any
	}

	const _pressItemFromList = ({ listType, item }: onPressProps) => {
		switch (listType) {
			case 'contacts':
				const indexToRemove = contacts.indexOf(item)
				if (indexToRemove !== -1) {
					const sorted = [
						...contacts.slice(0, indexToRemove),
						...contacts.slice(indexToRemove + 1),
					].sort((a, b) => {
						const nameA = a.value.toLowerCase()
						const nameB = b.value.toLowerCase()

						if (nameA < nameB) return -1
						if (nameA > nameB) return 1
						return 0
					})
					setContacts(sorted)
					setSelected(prev => [...prev, item])
				} else {
					setSelected(prev => [...prev, item])
				}
				return
			case 'selected':
				const selectedItemIndex = selected.indexOf(item)
				if (selectedItemIndex !== -1) {
					setSelected([
						...selected.slice(0, selectedItemIndex),
						...selected.slice(selectedItemIndex + 1),
					])
					setContacts(prev =>
						[...prev, item].sort((a, b) => {
							const nameA = a.value.toLowerCase()
							const nameB = b.value.toLowerCase()

							if (nameA < nameB) return -1
							if (nameA > nameB) return 1
							return 0
						}),
					)
				} else {
					setContacts(prev =>
						[...prev, item].sort((a, b) => {
							// Use the 'name' property for comparison
							const nameA = a.value.toLowerCase()
							const nameB = b.value.toLowerCase()

							if (nameA < nameB) return -1
							if (nameA > nameB) return 1
							return 0
						}),
					)
				}

				break
		}
	}
	// const filteredData = filter(contacts, item =>
	// 	item.name.toLowerCase().includes(watch().toLowerCase()),
	// )
	return (
		<>
			<Input
				variant='underlined'
				alignItems='flex-start'
				px={'$4'}
				flexDirection='row'
				borderWidth={'$0'}
				sx={{
					height: 'auto',
					borderBottomWidth: 1,
					borderTopWidth: 1,
					borderColor: '$gray300',
				}}
			>
				<Text color='$gray400' mr={'$2'} fontSize={'$sm'}>
					To:
				</Text>
				<VStack flex={1}>
					<Controller
						control={control}
						name='selected'
						render={({ field: { value, onChange } }) => (
							<HStack flexWrap='wrap' space='sm' mx={'$2'} mt={'$1'}>
								{selected.map(item => (
									<Button
										onPress={() => {
											_pressItemFromList({
												listType: 'selected',
												item,
											})
										}}
										sx={{
											_light: {
												bg: '$light200',
											},
											_dark: {
												bg: '$dark200',
											},
										}}
										alignSelf='center'
										size='xs'
										px={'$2'}
										my={'$1'}
										h={'$6'}
									>
										<Button.Text
											sx={{
												_light: {
													color: '$primary500',
												},
												_dark: {
													color: '$primary500',
												},
											}}
											fontWeight='$normal'
											letterSpacing={'$lg'}
											fontSize={'$sm'}
										>
											{item.value}
										</Button.Text>
									</Button>
								))}
							</HStack>
						)}
					/>
					<Controller
						control={control}
						name='searchtext'
						render={({ field: { value, onChange } }) => (
							<HStack justifyContent='space-between' alignItems='center'>
								<Input.Input
									autoFocus
									borderWidth={'$0'}
									returnKeyType='default'
									w={'$full'}
									pr={'$2'}
									py={'$1'}
									mt={'$2'}
									underlineColorAndroid='transparent'
									keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
									value={value}
									onChangeText={onChange}
									// onKeyPress={e => {
									// 	if (value.length === 0 && e.nativeEvent.key == 'Backspace') {
									// 		_pressItemFromList({ listType: 'selected', item: selected[selected.length - 1] })
									// 	}
									// }}
									onSubmitEditing={() => {
										console.log('submitting')
									}}
									blurOnSubmit={false}
								/>
								<Button
									size='sm'
									// bg='transparent'

									px={'$0'}
									h={'$5'}
									w={'$5'}
									hitSlop={{
										top: 12,
										bottom: 12,
										left: 12,
										right: 12,
									}}
									rounded={'$full'}
									borderWidth={'$1'}
									borderColor='$primary500'
									onPress={() => {
										console.log('OPEN SECONDARY modal')
									}}
								>
									<Button.Icon as={AddIcon} />
								</Button>
							</HStack>
						)}
					/>
				</VStack>
			</Input>

			<FlashList
				data={contacts}
				estimatedItemSize={80}
				contentInset={{
					bottom: insets.bottom,
				}}
				renderItem={({ item, index }) => {
					console.log('item :>> ', item)
					return (
						<Pressable
							sx={{
								h: 50,
							}}
							bg='$red800'
							my={'$1'}
							onPress={() => {
								_pressItemFromList({
									listType: 'contacts',
									item,
								})
							}}
						>
							<ContactItem index={index} item={item} />
						</Pressable>
					)
				}}
				// renderItem={item => {
				// 	return (
				// 		<Pressable
				// 			sx={{
				// 				h: 50,
				// 			}}
				// 			bg='$red800'
				// 			my={'$1'}
				// 			onPress={() => {
				// 				setSelected(prev => [...prev, item.item])
				// 			}}
				// 		>
				// 			<Text>{item.item.value}</Text>
				// 		</Pressable>
				// 	)
				// }}
			/>
		</>
	)
}
