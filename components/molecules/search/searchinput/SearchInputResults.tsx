import { useReactiveVar } from '@apollo/client'
import { HStack, Input, InputField, Pressable } from '@gluestack-ui/themed'
import { Ionicons } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'
import { useGlobalSearchParams, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {
	placeholder?: string
}

const SearchInputResults = (props: Props) => {
	const insets = useSafeAreaInsets()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const router = useRouter()
	const params = useGlobalSearchParams()

	return (
		<HStack position={'relative'} flex={1} sx={{ mt: insets.top }} pb={'$2'}>
			<Pressable onPress={() => router.back()} justifyContent='center'>
				<Ionicons
					color={
						rTheme.colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light700
							: rTheme.theme?.gluestack.tokens.colors.light100
					}
					name='ios-arrow-back'
					size={30}
					style={{
						marginLeft: 8,
						marginHorizontal: 5,
					}}
				/>
			</Pressable>
			<Input
				flex={1}
				variant='rounded'
				mr={'$3'}
				zIndex={0}
				hitSlop={{ top: 12, bottom: 12, left: 0, right: 15 }}
				bg={
					rTheme.colorScheme === 'light'
						? rTheme.theme?.gluestack.tokens.colors.light100
						: rTheme.theme?.gluestack.tokens.colors.light900
				}
				isReadOnly
			>
				<InputField
					placeholderTextColor={
						rTheme.colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light700
							: rTheme.theme?.gluestack.tokens.colors.light100
					}
					autoCapitalize={'none'}
					autoCorrect={false}
					autoComplete='off'
					value={params.searchtext}
					textAlign='center'
					fontSize={'$md'}
					fontWeight={'$bold'}
					color='$gray400'
					onPressIn={() => {
						router.push({
							pathname: '/(app)/explore/searchtext',
						})
					}}
					placeholder={props.placeholder || 'Search'}
					returnKeyType='search'
					underlineColorAndroid='transparent'
					keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
				/>
			</Input>
		</HStack>
	)
}

export default SearchInputResults
