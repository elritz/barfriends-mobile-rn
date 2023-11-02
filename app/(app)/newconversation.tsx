import { useReactiveVar } from '@apollo/client'
import ContactItem from '@components/screens/conversations/ContactItem'
import SearchResultContactItem from '@components/screens/conversations/SearchResultContactItem'
import {
	AddIcon,
	Button,
	Text,
	Input,
	Pressable,
	HStack,
	VStack,
	CloseIcon,
	CloseCircleIcon,
	ButtonText,
} from '@gluestack-ui/themed'
import { ThemeReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import useContentInsets from '@util/hooks/useContentInsets'
import useDebounce from '@util/hooks/useDebounce'
import Fuse from 'fuse.js'
import { useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

const contactslist = [
	{ key: '1', value: 'mobiles', disabled: true },
	{ key: '2', value: 'appliances' },
	{ key: '3', value: 'cameras' },
	{ key: '4', value: 'computers', disabled: true },
	{ key: '5', value: 'vegetables' },
	{ key: '6', value: 'diary Products' },
	{ key: '7', value: 'drinks' },
	{ key: '5', value: 'vegetables' },
	{ key: '126', value: 'diary Products' },
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

	const [searchFilterIsLoading, setSearchFilterIsLoading] = useState(true)
	const [selected, setSelected] = useState([])
	const [filteredContacts, setFilteredContacts] = useState([])
	const [contacts, setContacts] = useState(
		contactslist.sort((a, b) => {
			const nameA = a.value.toLowerCase()
			const nameB = b.value.toLowerCase()

			if (nameA < nameB) return -1
			if (nameA > nameB) return 1
			return 0
		}),
	)

	const options = {
		keys: ['value'],
	}

	const fuse = new Fuse(contacts, options)

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
		listType: 'contacts' | 'selected' | 'searchresult'
		item: any
	}

	const _pressItemFromList = ({ listType, item }: onPressProps) => {
		switch (listType) {
			case 'searchresult':
				const indexToRemoveContacts = contacts.indexOf(item.item)
				const indexToRemoveFiltered = filteredContacts.indexOf(item)

				if (indexToRemoveFiltered !== -1) {
					const filteredSorted = [
						...filteredContacts.slice(0, indexToRemoveFiltered),
						...filteredContacts.slice(indexToRemoveFiltered + 1),
					]
					setFilteredContacts(filteredSorted)

					setSelected(prev => [...prev, item.item])
				}

				if (indexToRemoveContacts !== -1) {
					const sorted = [
						...contacts.slice(0, indexToRemoveContacts),
						...contacts.slice(indexToRemoveContacts + 1),
					].sort((a, b) => {
						const nameA = a.value.toLowerCase()
						const nameB = b.value.toLowerCase()

						if (nameA < nameB) return -1
						if (nameA > nameB) return 1
						return 0
					})
					setContacts(sorted)
				}
				return
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

	const debouncedSearchResults = useDebounce(watch().searchtext, 400)

	const searchFilterFunction = text => {
		setSearchFilterIsLoading(true)
		if (text) {
			const result = fuse.search(text)

			setFilteredContacts(result)
		} else {
			setFilteredContacts([])
		}
		setSearchFilterIsLoading(false)
	}

	useMemo(() => {
		if (watch().searchtext) {
		}
		searchFilterFunction(watch().searchtext)
	}, [debouncedSearchResults])

	return (
		<>
			<Input
				variant='underlined'
				alignItems='flex-start'
				px={'$4'}
				mt={'$10'}
				flexDirection='row'
				borderWidth={'$0'}
				sx={{
					height: 'auto',
					borderBottomWidth: 1,
					// borderTopWidth: 1,
					_light: {
						borderColor: '$light400',
					},
					_dark: {
						borderColor: '$light700',
					},
				}}
			>
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
												bg: '$light700',
											},
										}}
										alignSelf='center'
										size='xs'
										px={'$2'}
										my={'$1'}
										h={'$7'}
									>
										<ButtonText
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
											textTransform='capitalize'
										>
											{item.value}
										</ButtonText>
									</Button>
								))}
							</HStack>
						)}
					/>
					<Controller
						control={control}
						name='searchtext'
						render={({ field: { value, onChange } }) => (
							<HStack justifyContent='space-between' alignItems='center' mt={'$2'}>
								<Text fontSize={'$sm'}>To:</Text>
								<Input.Input
									autoFocus
									borderWidth={'$0'}
									returnKeyType='default'
									w={'$full'}
									pr={'$2'}
									onFocus={() => setSearchFilterIsLoading(true)}
									py={'$1'}
									m={'$2'}
									underlineColorAndroid='transparent'
									keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
									value={value}
									// onChangeText={text => {
									// 	console.log('text :>> ', text)
									// 	onChange(text)
									// 	fuse.search(text)
									// }}
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
								{value.length > 0 && (
									<Button
										size='sm'
										px={'$0'}
										h={'$5'}
										w={'$5'}
										hitSlop={{
											top: 12,
											bottom: 12,
											left: 12,
											right: 12,
										}}
										variant='link'
										rounded={'$full'}
										borderWidth={'$1'}
										borderColor='$primary500'
										onPress={() => {
											setValue('searchtext', '')
										}}
									>
										<Button.Icon as={CloseIcon} />
									</Button>
								)}
							</HStack>
						)}
					/>
				</VStack>
			</Input>

			{watch().searchtext.length && !searchFilterIsLoading ? (
				<FlashList
					data={watch().searchtext.length ? filteredContacts : contacts}
					estimatedItemSize={80}
					keyboardDismissMode='on-drag'
					contentInset={{
						bottom: insets.bottom,
					}}
					renderItem={({ item, index }) => {
						return (
							<Pressable
								onPress={() => {
									_pressItemFromList({
										listType: 'searchresult',
										item,
									})
								}}
							>
								<ContactItem index={index} item={item.item} />
							</Pressable>
						)
					}}
				/>
			) : (
				<FlashList
					data={contacts}
					estimatedItemSize={80}
					keyboardDismissMode='on-drag'
					contentInset={{
						bottom: insets.bottom,
					}}
					renderItem={({ item, index }) => {
						return (
							<Pressable
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
				/>
			)}
		</>
	)
}
