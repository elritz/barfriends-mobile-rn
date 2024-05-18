import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { HStack, Input, InputField, Pressable, Text } from '@gluestack-ui/themed'
import { ThemeReactiveVar } from '#/reactive'
import { useGlobalSearchParams, useRouter, useSegments, router as _Router } from 'expo-router'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TextInput } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {
	placeholder?: string
}

const SearchInputVenueFeedDisabled = (props: Props) => {
	const insets = useSafeAreaInsets()
	const _inputRef = useRef<TextInput | undefined>()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const router = useRouter()
	const segments: String[] = useSegments()
	const [showBack, setShowBack] = useState(false)

	return (
		<HStack position={'relative'} flex={1} sx={{ mt: insets.top }}>
			<Pressable
				position={'relative'}
				flex={1}
				pb={'$2'}
				onPressIn={() => {
					if (segments.includes('hometab')) {
						router.push({
							pathname: '/(app)/explore/searchtext',
							params: {
								searchtext: '',
							},
						})
					}
				}}
			>
				<Input
					alignItems='center'
					justifyContent='center'
					flex={1}
					variant='rounded'
					mr={'$2'}
					ml={!showBack ? '$2' : '$0'}
					bg={
						rTheme.colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light100
							: rTheme.theme?.gluestack.tokens.colors.light900
					}
					isReadOnly={true}
				>
					<Ionicons
						color={
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light700
								: rTheme.theme?.gluestack.tokens.colors.light100
						}
						name='search'
						style={{
							paddingRight: 5,
						}}
						size={18}
					/>
					<Text lineHeight={'$md'} fontSize={'$lg'}>
						Search
					</Text>
				</Input>
			</Pressable>
		</HStack>
	)
}

export default SearchInputVenueFeedDisabled
