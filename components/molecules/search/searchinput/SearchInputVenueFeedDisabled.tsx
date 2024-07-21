import { Text } from "#/components/ui/text";
import { Pressable } from "#/components/ui/pressable";
import { Input, InputField } from "#/components/ui/input";
import { HStack } from "#/components/ui/hstack";
import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
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
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const router = useRouter()
	const segments: string[] = useSegments()
	const [showBack, setShowBack] = useState(false)

	return (
		<HStack className="relative flex-1 mt-[10]">
			<Pressable
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
				className="relative flex-1 pb-2">
				<Input
					variant='rounded'
					isReadOnly={true}
					className={` ${rTheme.colorScheme === 'light' ? rTheme.theme?.gluestack.tokens.colors.light100 : rTheme.theme?.gluestack.tokens.colors.light900} ${!showBack ? "ml-2" : "ml-0"} items-center justify-center flex-1 mr-2 `}>
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
					<Text className="leading-md text-lg">
						Search
					</Text>
				</Input>
			</Pressable>
		</HStack>
	);
}

export default SearchInputVenueFeedDisabled
